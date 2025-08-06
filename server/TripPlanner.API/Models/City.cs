using System.ComponentModel.DataAnnotations;

namespace TripPlanner.API.Models
{
    public class City
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        public int CountryId { get; set; }

        public Country Country { get; set; } = null!;


        public string? Description { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }

        public ICollection<Attraction> Attractions { get; set; } = new List<Attraction>();
    }
}
