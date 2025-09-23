export class CityDTO {
  id: number;
  name: string;
  countryName: string;
  attractions: string[];
  description: string;

  constructor(
    id: number,
    name: string,
    countryName: string,
    attractions: string[],
    description: string
  ) {
    this.id = id;
    this.name = name;
    this.countryName = countryName;
    this.attractions = attractions;
    this.description = description;
  }
}
