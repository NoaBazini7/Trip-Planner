import {Routes} from '@angular/router';
import {Home} from './home/home';
import {PlanningWizard} from './planning-wizard/planning-wizard';
import {AttractionsBank} from './attractions-bank/attractions-bank';
import {ItineraryComponent} from './itinerary/itinerary';

const routeConfig: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page',
  },
    {
        path: 'plan',
        component: PlanningWizard,
        title: 'Plan your trip',
    },
  {
    path: 'attractions',
    component: ItineraryComponent,
    title: 'Attractions',
  }

];
export default routeConfig;
