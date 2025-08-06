import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {NgOptimizedImage} from '@angular/common';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  imports: [MatCardModule, MatIconModule, RouterModule, MatButton, MatIconButton, MatButtonToggle, MatButtonToggle, MatButtonToggle, MatButtonToggleGroup, NgOptimizedImage, MatMenuTrigger, MatMenu, MatMenuItem, MatToolbar],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css'
})
export class AppHeader {

}
