using System.ComponentModel.DataAnnotations;

namespace TripPlanner.API.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)] // Optional: Limit for DB schema and frontend UI
        public string? Username { get; set; }

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [MinLength(6)] // Optional: Enforce password strength
        public string? Password { get; set; }

        public List<Trip> SavedTrips { get; set; } = new();
    }
}
