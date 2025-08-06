import { Injectable } from '@angular/core';
import { AiAttractionDto } from '../models/attraction-dto';

@Injectable({ providedIn: 'root' })
export class AttractionStateService {
  private attractions: AiAttractionDto[] = [];

  setAttractions(attractions: AiAttractionDto[]): void {
    this.attractions = attractions;
    sessionStorage.setItem('attractions', JSON.stringify(attractions));
  }

  getAttractions(): AiAttractionDto[] {
    if (this.attractions.length === 0) {
      const stored = sessionStorage.getItem('attractions');
      if (stored) {
        this.attractions = JSON.parse(stored);
      }
    }
    return this.attractions;
  }

  clear(): void {
    this.attractions = [];
    sessionStorage.removeItem('attractions');
  }

}
