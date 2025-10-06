export class AttractionDTO {
  id: number;
  name: string;
  cityName: string;
  countryName: string;
  description: string;
  category: string;
  longitude: number;
  latitude: number;
  estimatedTime: number; // in hours
  openingHours: string; // e.g., "9:00 AM - 5:00 PM"
  popuarity: number; // scale of 1-5

  constructor(
    id: number,
    name: string,
    cityName: string,
    countryName: string,
    description: string,
    category: string,
    longitude: number,
    latitude: number,
    estimatedTime: number,
    openingHours: string,
    popuarity: number
  ) {
    this.id = id;
    this.name = name;
    this.cityName = cityName;
    this.countryName = countryName;
    this.description = description;
    this.category = category;
    this.longitude = longitude;
    this.latitude = latitude;
    this.estimatedTime = estimatedTime;
    this.openingHours = openingHours;
    this.popuarity = popuarity;
  }
}
