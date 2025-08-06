using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json;
using System.Text.RegularExpressions;
using TripPlanner.API.Data;
using TripPlanner.API.Models;
using TripPlanner.API.Models.DTOs;
using static System.Net.Mime.MediaTypeNames;


public class AiAttractionService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;
    private readonly TripPlannerDBContext _dbContext;

    public AiAttractionService(HttpClient httpClient, IConfiguration config, TripPlannerDBContext dbContext)
    {
        _httpClient = httpClient;
        _config = config;
        _dbContext = dbContext;
    }

    public async Task<List<AiAttractionDto>> GenerateAttractionsForCity(string cityName, string countryName)
    {
        // 🧼 Step 1: Check if city already has attractions in the database
        var city = await _dbContext.Cities
            .Include(c => c.Country)
            .Include(c => c.Attractions)
            .FirstOrDefaultAsync(c => c.Name == cityName && c.Country.Name == countryName);

        if (city == null)
            throw new Exception("City not found in the database.");

        if (city.Attractions != null && city.Attractions.Count > 0)
            return []; // Already generated, skip

        // 🔑 Step 2: Get API key
        var apiKey = _config["Cohere:ApiKey"];
        if (string.IsNullOrEmpty(apiKey))
            throw new Exception("Missing Cohere API key in configuration.");

        // ✉️ Step 3: Build prompt
        var prompt = $"""
        Give me a JSON array of exactly 12 of the most popular must-see tourist locations & attractions (must include some notable streets or areas) in {cityName}, {countryName}.
        Each object in the array must include the following fields with realistic values:

        - Name (string): official place name 
        - Description (string): a short 1-sentence description
        - Category (string): from "museum", "nature", "landmark", "entertainment", "cultural"
        - EstimatedTime (number): how many hours visitors usually spend there (e.g., 1.5, 2, 3)
        - Latitude (float)
        - Longitude (float)
        - Popularity (integer): from 1 (low) to 5 (very popular)
        - OpeningHours (string): full daily hours, formatted like:
          "Su: 10:00-18:00, M: 09:00-17:00, Tu: 09:00-17:00, W: 09:00-17:00, Th: 09:00-17:00, F: 09:00-15:00, Sa: 10:00-14:00"

        Output: compact JSON array ONLY with **exactly 12** objects. No text. No explanation.
        """;

        // 🔧 Step 4: Prepare request
        var requestBody = new
        {
            model = "command",
            prompt = prompt,
            max_tokens = 1600,
            temperature = 0.7
        };

        var jsonBody = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

        _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

        // 🚀 Step 5: Send request
        var response = await _httpClient.PostAsync("https://api.cohere.ai/v1/generate", content);



        // 🧾 Step 6: Parse JSON from response

        var attractions = ParseAttractionsFromResponse(response).Result;
        Console.WriteLine("---------------------------------------Attractions");

        if (attractions == null || attractions.Count == 0)
            throw new Exception("No attractions generated.");

        // 💾 Step 7: Save each attraction to DB and connect to city
        foreach (var dto in attractions)
        {
            var attraction = new Attraction
            {
                Name = dto.Name,
                Description = dto.Description,
                Category = dto.Category,
                EstimatedTime = dto.EstimatedTime,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                OpeningHours = dto.OpeningHours,
                Popularity = dto.Popularity,
                CityId = city.Id,
                Country = city.Country
            };

            _dbContext.Attractions.Add(attraction);
        }

        await _dbContext.SaveChangesAsync();

        return attractions;
    }

    public async Task<List<AiAttractionDto>> ParseAttractionsFromResponse(HttpResponseMessage response)
    {
        // Step 1: Parse Cohere response
        var responseContent = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
            throw new Exception($"Cohere API error: {responseContent}");

        using var doc = JsonDocument.Parse(responseContent);
        string? aiText = doc.RootElement.GetProperty("generations")[0].GetProperty("text").GetString();

        if (string.IsNullOrWhiteSpace(aiText))
            throw new Exception("AI response text is empty 😩");

        // Step 2: Remove ```json or ``` and trim whitespace
        string cleaned = Regex.Replace(aiText, @"^```json\s*|```$", "", RegexOptions.Multiline).Trim();

        if (cleaned.StartsWith("```json"))
        {
            cleaned = cleaned.Substring(7);
            // Remove a possible newline after ```json
            cleaned = cleaned.TrimStart('\n', '\r');
        }
        if (cleaned.EndsWith("```"))
        {
            cleaned = cleaned.Substring(0, cleaned.Length - 3);
        }
        cleaned = cleaned.Trim();

        // Step 3: This is now real JSON — ready to deserialize
        Console.WriteLine("🧼 Final Cleaned JSON:\n" + cleaned);

        // Step 4: (optional) fix time strings like "3 hours"
        cleaned = Regex.Replace(cleaned, @"""suggestedDurationMinutes""\s*:\s*""(\d+)\s*hours?""", m =>
        {
            int hours = int.Parse(m.Groups[1].Value);
            return $"\"suggestedDurationMinutes\": {hours * 60}";
        });

        cleaned = Regex.Replace(cleaned, @"""popularity""\s*:\s*""(\d+)""", m =>
        {
            return $"\"popularity\": {m.Groups[1].Value}";
        });

        // Step 5: Parse the cleaned JSON
        try
        {
            List<AiAttractionDto>? attractions = JsonSerializer.Deserialize<List<AiAttractionDto>>(cleaned, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            Console.WriteLine($"✅ Parsed {attractions?.Count} attractions.");
            return attractions;
        }
        catch (Exception ex)
        {
            Console.WriteLine("❌ Deserialization failed: " + ex.Message);
            Console.WriteLine("JSON was:\n" + cleaned);
            throw;
        }
    }
}
