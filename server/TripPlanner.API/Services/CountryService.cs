using Microsoft.EntityFrameworkCore;
using TripPlanner.API.Data;
using TripPlanner.API.Models;
using TripPlanner.API.Models.DTOs;

namespace TripPlanner.API.Services
{
    public class CountryService
    {
        private readonly TripPlannerDBContext _context;

        public CountryService(TripPlannerDBContext context)
        {
            _context = context;
        }

        public async Task<List<CountryResponseDto>> GetAllCountriesAsync()
        {
            return await _context.Countries
                .Include(c => c.Cities)
                .Select(c => new CountryResponseDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Code = c.Code,
                    Cities = c.Cities.Select(city => new CityDto
                    {
                        Id = city.Id,
                        Name = city.Name
                    }).ToList()
                }).ToListAsync();
        }

        public async Task<CountryResponseDto?> GetCountryByIdAsync(int id)
        {
            var country = await _context.Countries
                .Include(c => c.Cities)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (country == null) return null;

            return new CountryResponseDto
            {
                Id = country.Id,
                Name = country.Name,
                Code = country.Code,
                Cities = country.Cities.Select(city => new CityDto
                {
                    Id = city.Id,
                    Name = city.Name
                }).ToList()
            };
        }

        public async Task<CountryResponseDto?> GetCountryByNameAsync(string name)
        {
            var country = await _context.Countries
                .Include(c => c.Cities)
                .FirstOrDefaultAsync(c => c.Name == name);

            if (country == null) return null;

            return new CountryResponseDto
            {
                Id = country.Id,
                Name = country.Name,
                Code = country.Code,
                Cities = country.Cities.Select(city => new CityDto
                {
                    Id = city.Id,
                    Name = city.Name
                }).ToList()
            };
        }


        public async Task<CountryResponseDto> CreateCountryAsync(CountryRequestDto countryRequest)
        {
            var country = new Country
            {
                Name = countryRequest.Name,
                Code = countryRequest.Code,
                Cities = await _context.Cities
                    .Where(c => countryRequest.CityIds.Contains(c.Id))
                    .ToListAsync()
            };

            _context.Countries.Add(country);
            await _context.SaveChangesAsync();

            return new CountryResponseDto
            {
                Id = country.Id,
                Name = country.Name,
                Code = country.Code,
                Cities = country.Cities.Select(city => new CityDto
                {
                    Id = city.Id,
                    Name = city.Name
                }).ToList()
            };
        }

        public async Task<CountryResponseDto?> UpdateCountryAsync(int id, CountryRequestDto countryRequest)
        {
            var country = await _context.Countries
                .Include(c => c.Cities)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (country == null) return null;

            country.Name = countryRequest.Name;
            country.Code = countryRequest.Code;
            country.Cities = await _context.Cities
                .Where(c => countryRequest.CityIds.Contains(c.Id))
                .ToListAsync();

            _context.Countries.Update(country);
            await _context.SaveChangesAsync();

            return new CountryResponseDto
            {
                Id = country.Id,
                Name = country.Name,
                Code = country.Code,
                Cities = country.Cities.Select(city => new CityDto
                {
                    Id = city.Id,
                    Name = city.Name
                }).ToList()
            };
        }

        public async Task<bool> DeleteCountryAsync(int id)
        {
            var country = await _context.Countries.FindAsync(id);
            if (country == null) return false;

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();
            return true;
        }


    }
}
