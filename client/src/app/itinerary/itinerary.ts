import { Component } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgForOf, NgIf} from '@angular/common';
import {AiAttractionDto} from '../models/attraction-dto';
import {AttractionsBank} from '../attractions-bank/attractions-bank';
import {CarouselComponent, CarouselInnerComponent, CarouselItemComponent} from '@coreui/angular';
import {CarouselModule} from 'ngx-owl-carousel-o';

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
    CarouselModule
  ],
  styleUrls: ['./itinerary.css']
})
export class ItineraryComponent {
  timeSlots: string[] = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
    '20:00', '21:00', '22:00'
  ];

  itineraryDays: {day: string; activities: any} [] = [
    { day: 'Day 1', activities: {} },
    { day: 'Day 2', activities: {} },
    { day: 'Day 3', activities: {} },
    { day: 'Day 4', activities: {} },
    { day: 'Day 5', activities: {} },
    { day: 'Day 6', activities: {} },
    { day: 'Day 7', activities: {} }

  ];

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



  ngOnInit() {
    this.itineraryDays.forEach(day => {
      day.activities = {};
      this.timeSlots.forEach(time => {
        day.activities[time] = null;
      });
    });
  }


  drop(event: CdkDragDrop<any[]>, dayIndex: number, time: string) {

    if (!event.isPointerOverContainer) {
      return;
    }
    const attraction: AiAttractionDto = event.item.data;

    // Set it into the time slot only if empty
    if (!this.itineraryDays[dayIndex].activities[time]) {
      this.itineraryDays[dayIndex].activities[time] = attraction;
    } else {
      console.log('Slot already filled');
    }
  }

  asAttractionList(list: AiAttractionDto[]): AiAttractionDto[] {
    return list;
  }
}
