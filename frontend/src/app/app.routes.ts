import { Routes } from '@angular/router';
import { ExamplesPageComponent } from './examples-page/examples-page.component';
import { InterviewPageComponent } from './interview-page/interview-page.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'examples', component: ExamplesPageComponent },
  { path: 'interview', component: InterviewPageComponent },
];
