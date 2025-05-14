import { Routes } from '@angular/router';
import { ExamplesPageComponent } from './examples-page/examples-page.component';
import { InterviewPageComponent } from './interview-page/interview-page.component';
import {CountryListComponent} from "./country-list/country-list.component"

export const routes: Routes = [
  { path: '', redirectTo: 'examples', pathMatch: 'full' },
  { path: 'examples', component: ExamplesPageComponent },
  { path: 'interview', component: InterviewPageComponent },
  { path: 'countries', component: CountryListComponent },
];
