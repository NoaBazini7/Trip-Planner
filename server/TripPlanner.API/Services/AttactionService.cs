using Microsoft.EntityFrameworkCore;
using TripPlanner.API.Controllers;
using TripPlanner.API.Data;
using TripPlanner.API.Models;
using TripPlanner.API.Models.DTOs;

namespace TripPlanner.API.Services
{
    public class AttractionService
    {
        private readonly TripPlannerDBContext _context;

        public AttractionService(TripPlannerDBContext context)
        {
            _context = context;
        }

        public async Task<List<AttractionResponseDto>> GetAllAttractionsAsync()
        {
            return await _context.Attractions
                .Include(a => a.City)
                .Select(a => new AttractionResponseDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    CityName = a.City.Name,
                    CountryName = a.Country.Name,
                    Description = a.Description,
                    Category = a.Category,
                    Longitude = a.Longitude,
                    Latitude = a.Latitude,
                    EstimatedTime = a.EstimatedTime,
                    OpeningHours = a.OpeningHours,
                    Popularity = a.Popularity
                }).ToListAsync();
        }

        public async Task<AttractionResponseDto?> GetAttractionByIdAsync(int id)
        {
            var attraction = await _context.Attractions
                .Include(a => a.City)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (attraction == null) return null;

            return new AttractionResponseDto
            {
                Id = attraction.Id,
                Name = attraction.Name,
                CityName = attraction.City.Name,
                CountryName = attraction.Country.Name,
                Description = attraction.Description,
                Category = attraction.Category,
                Longitude = attraction.Longitude,
                Latitude = attraction.Latitude,
                EstimatedTime = attraction.EstimatedTime,
                OpeningHours = attraction.OpeningHours,
                Popularity = attraction.Popularity
            };
        }

        public async Task<AttractionResponseDto> CreateAttractionAsync(AttractionRequestDto dto)
        {
            // Validate City exists
            var city = await _context.Cities.FindAsync(dto.CityId);
            var country = await _context.Countries.FindAsync(dto.CountryName);
            if (city == null)
            {
                throw new ArgumentException("Invalid City ID");
            }

            var attraction = new Attraction
            {
                Name = dto.Name,
                CityId = dto.CityId,
                City = city,
                Country = country,
                Description = dto.Description,
                Category = dto.Category,
                Longitude = dto.Longitude,
                Latitude = dto.Latitude,
                EstimatedTime = dto.EstimatedTime,
                OpeningHours = dto.OpeningHours,
                Popularity = dto.Popularity
            };

            _context.Attractions.Add(attraction);
            await _context.SaveChangesAsync();

            return new AttractionResponseDto
            {
                Id = attraction.Id,
                Name = attraction.Name,
                CityName = city.Name,
                CountryName = country.Name,
                Description = attraction.Description,
                Category = attraction.Category,
                Longitude = attraction.Longitude,
                Latitude = attraction.Latitude,
                EstimatedTime = attraction.EstimatedTime,
                OpeningHours = attraction.OpeningHours,
                Popularity = attraction.Popularity
            };
        }
    }
}
