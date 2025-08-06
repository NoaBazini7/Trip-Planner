using System.ComponentModel.DataAnnotations;

namespace TripPlanner.API.Models
{
    public class Attraction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public int CityId { get; set; }

        [Required]
        public City City { get; set; } = null!;

        [Required]
        public Country? Country { get; set; }

        public string? Description { get; set; }

        [Required]
        public string? Category { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double EstimatedTime { get; set; }

        [Required]
        public string? OpeningHours { get; set; }

        [Required]
        public int Popularity { get; set; } // 1-5 scale


    }
}
