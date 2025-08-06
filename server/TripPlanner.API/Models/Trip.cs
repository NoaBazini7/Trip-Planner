using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using TripPlanner.API.Models;
public class Trip
{
    public int Id { get; set; }

    // FK — automatically links to the User
    public int UserId { get; set; }

    // Navigation property (object)
    [Required]
    public User? User { get; set; }

    [Required]
    public string? Title { get; set; }

    [Required]
    public Country? Country { get; set; }

    [Required]
    public City? City { get; set; }

}
