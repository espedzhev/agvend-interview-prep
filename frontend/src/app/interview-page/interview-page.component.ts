import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common"
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-interview-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interview-page.component.html',
  styles: ``
})
export class InterviewPageComponent {
   private readonly http = inject(HttpClient)

}
