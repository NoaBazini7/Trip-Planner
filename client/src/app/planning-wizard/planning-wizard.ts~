import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FormsModule } from '@angular/forms';
import { DateRange } from '@angular/material/datepicker';
import { Input, Output, EventEmitter } from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import { CountryService, Country, City } from '../services/country.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTimepickerModule} from '@angular/material/timepicker';
import { DraggableClockComponent } from "../draggable-clock/draggable-clock";
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxSliderModule, Options} from '@angular-slider/ngx-slider';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HttpClient } from '@angular/common/http';
import {Router, RouterLink} from '@angular/router';
import {AttractionStateService} from '../services/attraction-state.service';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-planning-wizard',
  imports: [CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatNativeDateModule,
    FormsModule,
    NgxDaterangepickerMd,
    MatCalendar,
    MatTimepickerModule,
    DraggableClockComponent,
    NgbCarouselModule,
    NgxSliderModule,
    MatButtonToggleModule, MatButton, MatMenuTrigger, MatMenu, MatMenuItem, RouterLink,

  ],
  templateUrl: './planning-wizard.html',
  styleUrl: './planning-wizard.css'
})
export class PlanningWizard  implements OnInit {

  @Input() selectedRangeValue: DateRange<Date> | undefined;
    @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

    selectedChange(m: any) {
      console.log('Selected date:', m);
        if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
            this.selectedRangeValue = new DateRange<Date>(m, null);
        } else {
            const start = this.selectedRangeValue.start;
            const end = m;
            if (end < start) {
                this.selectedRangeValue = new DateRange<Date>(end, start);
            } else {
                this.selectedRangeValue = new DateRange<Date>(start, end);
            }
        }
        console.log('Selected range:', this.selectedRangeValue);
        this.selectedRangeValueChange.emit(this.selectedRangeValue);
    }

    countries: Country[] = [];
    hoveredCountry: Country | null = null;
    selectedCountry: Country | null = null;
    cities: City[] = [];
    selectedCity: City | null = null;
    arrivalHour: string | null= null;
    arrivalMinute: string | null= null;
    leaveHour: string | null= null;
    leaveMinute: string | null= null;
    arrivalHourNumber: number | null = null;
    leaveMinuteNumber: number | null = null;
    leaveHourNumber:  number | null = null;
    arrivalMinuteNumber:  number | null = null;
    dayStart: number = 7;
    dayEnd: number = 22;
    dayStartEndOptions: Options = {
        floor: 7,
        ceil: 22,
        step: 1,
        showSelectionBar: true,

        translate: (value: number): string => {
          return `${value}:00`;
          }
        };

      eatingStyle: 'fast'| 'normal' | 'relaxed' = 'normal';

    constructor(private countryService: CountryService, private http: HttpClient, private router: Router,   private attractionState: AttractionStateService) {

    }

    ngOnInit(): void {
      this.countryService.getCountries().subscribe({
        next: (res) => {this.countries = res;
          console.log('Countries fetched successfully', this.countries);
        },
        error: (err) => console.error('Error fetching countries', err)
    });

  }


  onCitySelect(city: City): void {
    this.selectedCity = city;
    this.selectedCountry= this.hoveredCountry;
  }

  onTimeSelected(event: any): void {


      console.log(`Arrival time selected: ${this.arrivalHour}:${this.arrivalMinute}`);
      console.log(`Leave time selected: ${this.leaveHour}:${this.leaveMinute}`);

  }


  onClickNext() : void {

    var baseUrl = 'https://localhost:5001';
    this.http.post(baseUrl+'/api/aiattraction/generate', {
      cityId: this.selectedCity?.id
    }).subscribe({
      next: (attractions : any) => {
        //route to next page
        this.attractionState.setAttractions(attractions);
        this.router.navigate(['attractions']);

        console.log("Attractions Generated:", attractions);
      },
      error: (err) => {
        // handle error (e.g. city not found, or API error)
      }
    });
  }
}
