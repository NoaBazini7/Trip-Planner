using Microsoft.AspNetCore.Mvc;
using TripPlanner.API.Services;
using TripPlanner.API.Models.DTOs;

namespace TripPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CityController : ControllerBase
    {
        private readonly CityService _cityService;

        public CityController(CityService cityService)
        {
            _cityService = cityService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CityResponseDto>>> GetAllCities()
        {
            var cities = await _cityService.GetAllCitiesAsync();
            return Ok(cities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CityResponseDto>> GetCityById(int id)
        {
            var city = await _cityService.GetCityByIdAsync(id);
            if (city == null) return NotFound();
            return Ok(city);
        }

        [HttpPost]
        public async Task<ActionResult<CityResponseDto>> CreateNewCity([FromBody] CityRequestDto cityRequest)
        {
            // Validate the request
            if (cityRequest == null || string.IsNullOrEmpty(cityRequest.Name))
            {
                return BadRequest("Invalid city data.");
            }

            // Create the city
            var createdCity = await _cityService.CreateCityAsync(cityRequest);
            if (createdCity == null)
            {
                return BadRequest("Failed to create city.");
            }
            return CreatedAtAction(nameof(GetCityById), new { id = createdCity.Id }, createdCity);
        }

        // [HttpPut("{id}")]
        // public async Task<ActionResult<CityResponseDto>> UpdateCity(int id, [FromBody] CityRequestDto cityRequest)
        // {
        //     // Validate the request
        //     if (cityRequest == null || string.IsNullOrEmpty(cityRequest.Name) || cityRequest.CountryId <= 0)
        //     {
        //         return BadRequest("Invalid city data.");
        //     }

        //     // Update the city
        //     var updatedCity = await _cityService.UpdateCityAsync(id, cityRequest);
        //     if (updatedCity == null)
        //     {
        //         return NotFound();
        //     }
        //     return Ok(updatedCity);
        // }

        // [HttpDelete("{id}")]
        // public async Task<IActionResult> DeleteCity(int id)
        // {
        //     var result = await _cityService.DeleteCityAsync(id);
        //     if (!result) return NotFound();
        //     return NoContent();
        // }
    }
}