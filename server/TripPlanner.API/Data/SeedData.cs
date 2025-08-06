using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using TripPlanner.API.Models;
using TripPlanner.API.Data;
using System.Collections.Generic;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new TripPlannerDBContext(
            serviceProvider.GetRequiredService<DbContextOptions<TripPlannerDBContext>>());

        if (context.Countries.Any()) return; // Already seeded

        // 🌍 Hardcoded seed data
        var countries = new List<Country>
        {
            new Country
            {
                Name = "France", Code = "FR",
                Cities =
                [
                    new City { Name = "Paris", Description = "The city of light", Latitude = 48.8566, Longitude = 2.3522 },
                    new City { Name = "Nice", Description = "Coastal beauty", Latitude = 43.7102, Longitude = 7.2620 },
                    new City { Name = "Lyon", Description = "Food capital of France", Latitude = 45.7640, Longitude = 4.8357 },
                ]
            },
            new Country
            {
                Name = "Italy", Code = "IT",
                Cities =
                [
                    new City { Name = "Rome", Description = "Historic capital", Latitude = 41.9028, Longitude = 12.4964 },
                    new City { Name = "Venice", Description = "City of canals", Latitude = 45.4408, Longitude = 12.3155 },
                    new City { Name = "Florence", Description = "Art and architecture hub", Latitude = 43.7696, Longitude = 11.2558 },
                ]
            },
            new Country
            {
                Name = "Japan", Code = "JP",
                Cities =
                [
                    new City { Name = "Tokyo", Description = "Vibrant modern capital", Latitude = 35.6762, Longitude = 139.6503 },
                    new City { Name = "Kyoto", Description = "Historical temples", Latitude = 35.0116, Longitude = 135.7681 },
                    new City { Name = "Osaka", Description = "Food and culture", Latitude = 34.6937, Longitude = 135.5023 },
                ]
            },

            new Country
            {
                Name = "USA", Code = "US",
                Cities =
                [
                    new City { Name = "New York", Description = "The Big Apple", Latitude = 40.7128, Longitude = -74.0060 },
                    new City { Name = "Los Angeles", Description = "City of Angels", Latitude = 34.0522, Longitude = -118.2437 },
                    new City { Name = "Chicago", Description = "Windy City", Latitude = 41.8781, Longitude = -87.6298 },
                ]
            },
            new Country
            {
                Name = "Spain", Code = "ES",
                Cities =
                [
                    new City { Name = "Barcelona", Description = "Architectural marvels", Latitude = 41.3851, Longitude = 2.1734 },
                    new City { Name = "Madrid", Description = "Cultural capital", Latitude = 40.4168, Longitude = -3.7038 },
                    new City { Name = "Seville", Description = "Historic Andalusian city", Latitude = 37.3886, Longitude = -5.9823 },
                ]
            },
            new Country
            {
                Name = "Germany", Code = "DE",
                Cities =
                [
                    new City { Name = "Berlin", Description = "Capital with rich history", Latitude = 52.5200, Longitude = 13.4050 },
                    new City { Name = "Munich", Description = "Bavarian culture and Oktoberfest", Latitude = 48.1351, Longitude = 11.5820 },
                    new City { Name = "Hamburg", Description = "Port city with maritime charm", Latitude = 53.5511, Longitude = 9.9937 },
                ]
            },
            new Country
            {
                Name = "Australia", Code = "AU",
                Cities =
                [
                    new City { Name = "Sydney", Description = "Iconic harbour city", Latitude = -33.8688, Longitude = 151.2093 },
                    new City { Name = "Melbourne", Description = "Cultural capital of Australia", Latitude = -37.8136, Longitude = 144.9631 },
                    new City { Name = "Brisbane", Description = "Sunny and vibrant city", Latitude = -27.4698, Longitude = 153.0251 },
                ]
            },

            new Country
            {
                Name = "Canada", Code = "CA",
                Cities =
                [
                    new City { Name = "Toronto", Description = "Diverse and multicultural", Latitude = 43.6511, Longitude = -79.3470 },
                    new City { Name = "Vancouver", Description = "Stunning natural beauty", Latitude = 49.2827, Longitude = -123.1207 },
                    new City { Name = "Montreal", Description = "French-speaking cultural hub", Latitude = 45.5017, Longitude = -73.5673 },
                ]
            },

            new Country
            {
                Name = "Austria", Code = "AT",
                Cities =
                [
                    new City { Name = "Vienna", Description = "Cultural and historical capital", Latitude = 48.2082, Longitude = 16.3738 },
                    new City { Name = "Salzburg", Description = "Birthplace of Mozart", Latitude = 47.8095, Longitude = 13.0550 },
                    new City { Name = "Innsbruck", Description = "Alpine charm", Latitude = 47.2692, Longitude = 11.4041 },
                ]
            },

            new Country
            {
                Name = "Switzerland", Code = "CH",
                Cities =
                [
                    new City { Name = "Zurich", Description = "Financial hub with a vibrant arts scene", Latitude = 47.3769, Longitude = 8.5417 },
                    new City { Name = "Geneva", Description = "International city with a rich history", Latitude = 46.2044, Longitude = 6.1432 },
                    new City { Name = "Lucerne", Description = "Picturesque lakeside city", Latitude = 47.0502, Longitude = 8.3093 },
                ]
            },

            new Country
            {
                Name = "Netherlands", Code = "NL",
                Cities =
                [
                    new City { Name = "Amsterdam", Description = "Canals and culture", Latitude = 52.3676, Longitude = 4.9041 },
                    new City { Name = "Rotterdam", Description = "Modern architecture and maritime heritage", Latitude = 51.9225, Longitude = 4.4792 },
                    new City { Name = "Utrecht", Description = "Historic city with canals", Latitude = 52.0907, Longitude = 5.1214 },
                ]
            },

            new Country
            {
                Name= "Greece", Code = "GR",
                Cities =
                [
                    new City { Name = "Athens", Description = "Cradle of Western civilization", Latitude = 37.9838, Longitude = 23.7275 },
                    new City { Name = "Santorini", Description = "Stunning sunsets and volcanic beaches", Latitude = 36.3932, Longitude = 25.4615 },
                    new City { Name = "Thessaloniki", Description = "Cultural capital of Northern Greece", Latitude = 40.6401, Longitude = 22.9444 },
                ]
            },

            new Country
            {
                Name = "Portugal", Code = "PT",
                Cities =
                [
                    new City { Name = "Lisbon", Description = "Capital with rich maritime history", Latitude = 38.7223, Longitude = -9.1393 },
                    new City { Name = "Porto", Description = "Famous for port wine", Latitude = 41.1496, Longitude = -8.6110 },
                    new City { Name = "Funchal", Description = "Beautiful island city in Madeira", Latitude = 32.6654, Longitude = -16.9241 },
                ]
            },

            new Country
            {
                Name= "United Kingdom", Code = "UK",
                Cities =
                [
                    new City { Name = "London", Description = "Capital with rich history and culture", Latitude = 51.5074, Longitude = -0.1278 },
                    new City { Name = "Edinburgh", Description = "Historic capital of Scotland", Latitude = 55.9533, Longitude = -3.1883 },
                    new City { Name = "Manchester", Description = "Industrial heritage and vibrant music scene", Latitude = 53.4808, Longitude = -2.2426 },
                ]
            }
        };

        context.Countries.AddRange(countries);
        context.SaveChanges();
    }
}
