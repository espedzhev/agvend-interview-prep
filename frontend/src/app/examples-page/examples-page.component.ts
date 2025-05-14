import {Component, computed, inject, signal} from '@angular/core';
import {ApiService} from '../api.service'
import { FormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-examples-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './examples-page.component.html',
  styles: ``
})
export class ExamplesPageComponent {
  title = 'ExamplesPageComponent'

  private apiService = inject(ApiService);

  listAInput = signal('')
  listBInput = signal('')

  list1 = computed(() =>
    this.listAInput()
      .split(',')
      .map(v => v.trim())
      .filter(Boolean)
  )

  list2 = computed(() =>
    this.listBInput()
      .split(',')
      .map(v => v.trim())
      .filter(Boolean)
  )

  result = signal<string[]>([])

  updateListAInput(event: Event) {
    this.listAInput.set((event.target as HTMLInputElement).value)
  }

  updateListBInput(event: Event) {
    this.listBInput.set((event.target as HTMLInputElement).value)
  }

  submit = () => {
    this.apiService
      .concatenate({
        list1: this.list1(),
        list2: this.list2(),
      })
      .subscribe({
        next: res => this.result.set(res.result),
        error: err => console.error('API error', err),
      })
  }
}
