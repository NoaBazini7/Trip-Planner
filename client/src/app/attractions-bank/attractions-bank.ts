import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {AiAttractionDto} from '../models/attraction-dto';
import {AttractionStateService} from '../services/attraction-state.service';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatChip} from '@angular/material/chips';
import {
  CdkDrag,
  CdkDragEnd,
  CdkDragPlaceholder,
  CdkDragPreview,
  CdkDragStart,
  CdkDropList
} from '@angular/cdk/drag-drop';
import {AttractionChipSimple} from '../attraction-chip-simple/attraction-chip-simple';


@Component({
  selector: 'attractions-bank',
  imports: [MatCardModule, RouterModule, NgForOf, MatButton, MatChip, NgClass, CdkDrag, CdkDropList, NgIf, AttractionChipSimple, CdkDragPlaceholder, CdkDragPreview, NgStyle],
  templateUrl: './attractions-bank.html',
  styleUrl: './attractions-bank.css'
})
export class AttractionsBank {

  attractionsBank: AiAttractionDto[] = [];
  @Output() attractionDropped = new EventEmitter<AiAttractionDto>();
  @Input() itineraryDays: { day: string; activities: any }[] = [];
  @Input() timeSlots: string[] = [];
  isDragging = false;
  draggingAttractionName: string | null = null;
  previewStyle = {};
  constructor(private attractionState: AttractionStateService) {
  }

  getConnectedDropLists(): string[] {
    return this.itineraryDays.flatMap((day, dayIndex) =>
      this.timeSlots.map(time => `drop-zone-${dayIndex}-${time}`)
    );
  }

  ngOnInit() {
    this.attractionsBank = this.attractionState.getAttractions();
    console.log('Attractions Bank:', this.attractionsBank);
  }

  getCategories(): string[] {
    const categories = new Set<string>();
    this.attractionsBank.forEach(attraction => {
      if (attraction.category) {
        categories.add(attraction.category);
      }
    });
    return Array.from(categories);
  }

  getAttractionsByCategory(category: string) {
    return this.attractionsBank.filter(attraction => attraction.category === category);
  }



  onDragEnded(event: CdkDragEnd): void {
    this.isDragging= false;
    const attraction = event.source.data;
    this.attractionDropped.emit(attraction);
  }

  onDragStarted(event: CdkDragStart) {
    const rect = event.source.element.nativeElement.getBoundingClientRect();
    console.log('Drag started for:', event.source.data.name, 'at rect:', rect);
    this.previewStyle = {
      transform: `translate(-${rect.width / 2}px, -${rect.height / 2}px) !important`,
    };
  }
}
