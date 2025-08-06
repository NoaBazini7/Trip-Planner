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
import {Router} from '@angular/router';
import {AttractionStateService} from '../services/attraction-state.service';
import {MatButton} from '@angular/material/button';

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
    MatButtonToggleModule, MatButton,

  ],
  templateUrl: './planning-wizard.html',
  styleUrl: './planning-wizard.css'
})
export class PlanningWizard  implements OnInit {

  @Input() selectedRangeValue: DateRange<Date> | undefined;
    @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

    selectedChange(m: any) {
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
        this.selectedRangeValueChange.emit(this.selectedRangeValue);
    }

    countries: Country[] = [];
    selectedCountry: Country | null = null;
    cities: City[] = [];
    selectedCity: City | null = null;
    arrivalHour: string = '07';
    arrivalMinute: string = '00';
    leaveHour: string = '07';
    leaveMinute: string = '00';
    arrivalHourNumber: number = 7;
    leaveMinuteNumber: number = 0;
    leaveHourNumber: number = 7;
    arrivalMinuteNumber: number = 0;
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
          this.selectedCountry = this.countries[0] || null;
          console.log('Countries fetched successfully', this.countries);
          this.cities = this.selectedCountry?.cities || [];
          this.selectedCity = this.cities[0] || null;
        },
        error: (err) => console.error('Error fetching countries', err)
    });

  }

  onCountrySelect(country: Country): void {
    this.selectedCountry = country;

    this.cities= country.cities || [];

  }

  onCitySelect(city: City): void {
    this.selectedCity = city;
  }

  onTimeSelected(event: any): void {

      if(event.hour == 0 && event.hour == 0) {
        if(event.type === 'leave') {
          this.leaveHour = '12';
        }
        else {
        this.arrivalHour = '12';
        }
      }
      else if(event.hour < 10) {
        if(event.type === 'leave') {
          this.leaveHourNumber = event.hour; // Store the hour as a number
          this.leaveHour = '0' + event.hour; // Add leading zero for single digit hours
        }
        else {
        this.arrivalHourNumber = event.hour; // Store the hour as a number
        this.arrivalHour = '0' + event.hour; // Add leading zero for single digit hours
        }
      } else {
      if(event.type === 'leave') {
        this.leaveHourNumber = event.hour; // Store the hour as a number
        this.leaveHour = event.hour.toString();
      }
      else {
        this.arrivalHourNumber = event.hour; // Store the hour as a number
        this.arrivalHour = event.hour.toString();
        }
      }
      if(event.type === 'leave') {
      this.leaveMinuteNumber = event.minute; // Store the minute as a number
        this.leaveMinute = event.minute==0 ? '00' : event.minute.toString();
      }
      else {
      this.arrivalMinuteNumber = event.minute; // Store the minute as a number
      this.arrivalMinute = event.minute==0 ? '00' : event.minute.toString(); // Ensure minutes are displayed as two digits
      }
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
