using Microsoft.AspNetCore.Mvc;
using TripPlanner.API.Services;
using TripPlanner.API.Models.DTOs;

namespace TripPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly CountryService _countryService;

        public CountryController(CountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CountryResponseDto>>> GetAllCountries()
        {
            var countries = await _countryService.GetAllCountriesAsync();
            return Ok(countries);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CountryResponseDto>> GetCountryById(int id)
        {
            var country = await _countryService.GetCountryByIdAsync(id);
            if (country == null) return NotFound();
            return Ok(country);
        }

        [HttpPost]

        public async Task<ActionResult<CountryResponseDto>> CreateNewCountry([FromBody] CountryRequestDto countryRequest)
        {
            // Validate the request
            if (countryRequest == null || string.IsNullOrEmpty(countryRequest.Name) || string.IsNullOrEmpty(countryRequest.Code))
            {
                return BadRequest("Invalid country data.");
            }

            // Create the country
            var createdCountry = await _countryService.CreateCountryAsync(countryRequest);
            if (createdCountry == null)
            {
                return BadRequest("Failed to create country.");
            }
            return CreatedAtAction(nameof(GetCountryById), new { id = createdCountry.Id }, createdCountry);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CountryResponseDto>> UpdateCountry(int id, [FromBody] CountryRequestDto countryRequest)
        {
            // Validate the request
            if (countryRequest == null || string.IsNullOrEmpty(countryRequest.Name) || string.IsNullOrEmpty(countryRequest.Code))
            {
                return BadRequest("Invalid country data.");
            }

            // Update the country
            var updatedCountry = await _countryService.UpdateCountryAsync(id, countryRequest);
            if (updatedCountry == null)
            {
                return NotFound();
            }
            return Ok(updatedCountry);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var result = await _countryService.DeleteCountryAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
