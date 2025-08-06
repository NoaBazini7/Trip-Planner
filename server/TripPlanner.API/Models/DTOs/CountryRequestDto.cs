namespace TripPlanner.API.Models.DTOs
{
    public class CountryRequestDto
    {
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public List<int> CityIds { get; set; } = new();
    }
}