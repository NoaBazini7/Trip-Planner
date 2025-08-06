import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import 'zone.js'; // Ensure zone.js is imported for Angular's change detection
import '@angular/localize/init'; // Import Angular localization initialization

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
  
