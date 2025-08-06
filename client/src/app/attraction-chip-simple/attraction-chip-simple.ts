import {Component, Input} from '@angular/core';
import {MatChip} from '@angular/material/chips';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-attraction-chip-simple',
  imports: [
    MatChip,
    MatCard
  ],
  templateUrl: './attraction-chip-simple.html',
  styleUrl: './attraction-chip-simple.css'
})
export class AttractionChipSimple {
  @Input() attraction: any;

}
