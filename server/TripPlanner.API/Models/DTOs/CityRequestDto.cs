namespace TripPlanner.API.Models.DTOs
{
    public class CityRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string CountryName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
    }
}