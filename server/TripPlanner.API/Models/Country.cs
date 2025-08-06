using System.ComponentModel.DataAnnotations;

namespace TripPlanner.API.Models
{
    public class Country
    {

        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Code { get; set; } = string.Empty; // ISO country code

        [Required]
        public ICollection<City> Cities { get; set; } = []; // Navigation property for related cities


    }
}