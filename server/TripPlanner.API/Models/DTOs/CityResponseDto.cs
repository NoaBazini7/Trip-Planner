namespace TripPlanner.API.Models.DTOs
{
    public class CityResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CountryName { get; set; } = string.Empty;
        public List<Attraction> Attractions { get; set; } = new();
        public string? Description { get; set; }


    }
}