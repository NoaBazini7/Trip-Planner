using Microsoft.AspNetCore.Mvc;
using TripPlanner.API.Models.DTOs;
using TripPlanner.API.Services;
using TripPlanner.API.Models;

namespace TripPlanner.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttractionController : ControllerBase
    {
        private readonly AttractionService _attractionService;

        public AttractionController(AttractionService attractionService)
        {
            _attractionService = attractionService;

        }

        [HttpGet]
        public async Task<ActionResult<List<AttractionResponseDto>>> GetAllAttractions()
        {
            var attractions = await _attractionService.GetAllAttractionsAsync();
            return Ok(attractions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AttractionResponseDto>> GetAttractionById(int id)
        {
            var attraction = await _attractionService.GetAttractionByIdAsync(id);
            if (attraction == null) return NotFound();
            return Ok(attraction);
        }

        [HttpPost]
        public async Task<ActionResult<AttractionResponseDto>> CreateAttraction([FromBody] AttractionRequestDto request)
        {
            if (request == null || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Category))
            {
                return BadRequest("Invalid attraction data.");
            }

            try
            {
                var createdAttraction = await _attractionService.CreateAttractionAsync(request);
                return CreatedAtAction(nameof(GetAttractionById), new { id = createdAttraction.Id }, createdAttraction);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }



        //         [HttpPut("{id}")]
        //         public async Task<ActionResult<AttractionResponseDto>> UpdateAttraction(int id, [FromBody] AttractionRequestDto request)
        //         {
        //             if (request == null || string.IsNullOrEmpty(request.Name) || string.IsNullOrEmpty(request.Category))
        //             {
        //                 return BadRequest("Invalid attraction data.");
        //             }

        //             var updatedAttraction = await _attractionService.UpdateAttractionAsync(id, request);
        //             if (updatedAttraction == null) return NotFound();

        //             return Ok(updatedAttraction);
        //         }

        //         [HttpDelete("{id}")]
        //         public async Task<IActionResult> DeleteAttraction(int id)
        //         {
        //             var success = await _attractionService.DeleteAttractionAsync(id);
        //             if (!success) return NotFound();
        //             return NoContent();
        //         }
    }
}
