
using Microsoft.AspNetCore.Mvc;
using TripPlanner.API.Services;
using TripPlanner.API.Models.DTOs;

namespace TripPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AiAttractionController : ControllerBase
    {
        private readonly AiAttractionService _aiService;
        private readonly CityService _cityService;
        private readonly CountryService _countryService;
        private readonly AttractionService _attractionService;

        public AiAttractionController(
            AiAttractionService aiService,
            CityService cityService,
            CountryService countryService,
            AttractionService attractionService)
        {
            _aiService = aiService;
            _cityService = cityService;
            _countryService = countryService;
            _attractionService = attractionService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateAttractions([FromBody] GenerateAttractionsRequest request)
        {
            var city = await _cityService.GetCityByIdAsync(request.CityId);
            if (city == null) return NotFound("City not found");

            var aiAttractions = await _aiService.GenerateAttractionsForCity(city.Name, city.CountryName);
            if (aiAttractions == null || aiAttractions.Count == 0)
            {
                foreach (var c in city.Attractions)
                {
                    aiAttractions.Add(new AiAttractionDto
                    {
                        Name = c.Name,
                        Description = c.Description,
                        Category = c.Category,
                        EstimatedTime = c.EstimatedTime,
                        Latitude = c.Latitude,
                        Longitude = c.Longitude,
                        Popularity = c.Popularity,
                        OpeningHours = c.OpeningHours
                    });
                }
                return Ok(aiAttractions);

            }
                



            return Ok(aiAttractions);
        }
    }
}
