import { Component, Input } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDragEnd, CdkDragStart, CdkDropList, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {AiAttractionDto} from '../models/attraction-dto';
import {AttractionsBank} from '../attractions-bank/attractions-bank';
import {CarouselComponent, CarouselInnerComponent, CarouselItemComponent} from '@coreui/angular';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatButton} from '@angular/material/button';
import {AttractionChipSimple} from '../attraction-chip-simple/attraction-chip-simple';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.html',
  imports: [
    CdkDropList,
    CdkDrag,
    NgForOf,
    AttractionsBank,
    NgIf,
    CarouselComponent,
    CarouselInnerComponent,
    CarouselItemComponent,
    CarouselModule,
    MatTable,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderCellDef,
    MatCellDef,
    MatSort,
    NgClass,
    DragDropModule,
    MatSidenavContainer,
    MatSidenav,
    MatButton,
    NgStyle,
    AttractionChipSimple
  ],
  styleUrls: ['./itinerary.css']
})
export class ItineraryComponent {
  @Input() numberOfDays: number = 6;
  previewStyle = {};

  timeSlots: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00'
  ];

  itineraryDays: { day: string; activities: { [time: string]: AiAttractionDto } }[] = [];
  displayedColumns: string[] = ['time'];

  ngOnInit(): void {
    // Create itineraryDays dynamically based on numberOfDays
    this.itineraryDays = Array.from({ length: this.numberOfDays }, (_, i) => ({
      day: `Day ${i + 1}`,
      activities: {}
    }));

    // Initialize each day with null for each time slot
    this.itineraryDays.forEach(day => {
      this.timeSlots.forEach(time => {
        // @ts-ignore
        day.activities[time] = null; // Initialize each time slot to null
      });
    });

    // Build displayedColumns dynamically: time column plus each day
    this.displayedColumns = ['time', ...this.itineraryDays.map(day => day.day)];
    document.documentElement.style.setProperty('--number-of-days', this.numberOfDays.toString());

  }



  carouselOptions = {
    items:4,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      600: {
        items: 3
      },
      800: {
        items: 4
      }
    },
    nav: true,
    navText: ['<span class="nav-left">&lt;</span>', '<span class="nav-right">&gt;</span>'],
    mouseDrag: false,
    dotsEach: true,

  }

  getConnectedDropLists(): string[] {
    return this.itineraryDays.flatMap((day, dayIndex) =>
      this.timeSlots.map(time => `drop-zone-${dayIndex}-${time}`)
    );
  }

  drop(event: CdkDragDrop<any[]>, dayIndex: number, time: string): void {
    if (!event.isPointerOverContainer) return;

    const attraction: AiAttractionDto = event.item.data;

    // Insert the attraction only if the slot is empty.
      this.itineraryDays[dayIndex].activities[time] = attraction;
      console.log('Slot filled');
  }

  dragEnded(event: CdkDragEnd, dayIndex: number, time: string): void {
    // @ts-ignore
    this.itineraryDays[dayIndex].activities[time] = null;


    console.log('Drag started for:', event.source.data.name, 'on', this.itineraryDays[dayIndex].day, 'at', time);
  }

  asAttractionList(list: AiAttractionDto[]): AiAttractionDto[] {
    return list;
  }
}
