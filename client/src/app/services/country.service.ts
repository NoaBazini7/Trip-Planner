import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Country {
  id: number;
  name: string;
  imageUrls?: string[]; // if you want to add optional images per country
  cities?: City[]; // optional, if you want to include cities directly in the country object
}

export interface City {
  id: number;
  name: string;
  countryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl = 'https://localhost:5001/api/country'; // adjust if needed

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}`);
  }

  getCitiesByCountry(countryId: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}/${countryId}/cities`);
  }
}
