using Microsoft.EntityFrameworkCore;
using TripPlanner.API.Data;
using TripPlanner.API.Models;
using TripPlanner.API.Models.DTOs;

namespace TripPlanner.API.Services
{
    public class CityService
    {
        private readonly TripPlannerDBContext _context;

        public CityService(TripPlannerDBContext context)
        {
            _context = context;
        }

        public async Task<List<CityResponseDto>> GetAllCitiesAsync()
        {
            return await _context.Cities
                .Include(c => c.Country)
                .Select(c => new CityResponseDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    CountryName = c.Country.Name,
                    Attractions = c.Attractions.ToList(),
                    Description = c.Description
                }).ToListAsync();
        }

        public async Task<CityResponseDto?> GetCityByIdAsync(int id)
        {
            var city = await _context.Cities
                .Include(c => c.Country)
                .Include(c => c.Attractions)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (city == null) return null;

            return new CityResponseDto
            {
                Id = city.Id,
                Name = city.Name,
                CountryName = city.Country.Name,
                Attractions = city.Attractions.ToList(),
                Description = city.Description
            };
        }

        public async Task<CityResponseDto> CreateCityAsync(CityRequestDto cityRequest)
        {
            var country = await _context.Countries.FindAsync(cityRequest.CountryName);
            if (country == null) throw new ArgumentException("Invalid country name");

            var city = new City
            {
                Name = cityRequest.Name,
                CountryId = country.Id,
                Description = cityRequest.Description,
                Longitude = cityRequest.Longitude,
                Latitude = cityRequest.Latitude
            };

            _context.Cities.Add(city);
            await _context.SaveChangesAsync();

            return new CityResponseDto
            {
                Id = city.Id,
                Name = city.Name,
                CountryName = country.Name,
                Attractions = new List<Attraction>(), // Initially empty, can be updated later
                Description = city.Description
            };
        }
    }
}