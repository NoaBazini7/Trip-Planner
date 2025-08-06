import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {RouterModule} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, RouterModule, MatButton],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
