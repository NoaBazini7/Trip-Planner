namespace TripPlanner.API.Models.DTOs
{
    public class AttractionResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CityName { get; set; } = string.Empty;
        public string? CountryName { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public double EstimatedTime { get; set; }
        public string? OpeningHours { get; set; }
        public int Popularity { get; set; } // 1-5



    }
}