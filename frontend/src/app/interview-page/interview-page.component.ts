import {Component, computed, inject, signal} from '@angular/core';
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

  querySearch = signal('')

  props = [
    { id: 1, name: 'Book' },
    { id: 2, name: 'Pencil' },
    { id: 3, name: 'Apple' },
    { id: 4, name: 'Notebook' },
    { id: 5, name: 'Pen' },
    { id: 6, name: 'Banana' },
    { id: 7, name: 'Eraser' },
    { id: 8, name: 'Orange' },
    { id: 9, name: 'Marker' },
    { id: 10, name: 'Laptop' },
    { id: 1001, name: 'Backpack' },
    { id: 1002, name: 'Avocado' },
  ]

  onSearchInput(event: Event) {
    this.querySearch.set((event.target as HTMLInputElement).value)
  }

  readonly filteredList = computed(() => {
    const query = this.querySearch().toLowerCase()
    console.log(query)
    let filtered = this.props.map(i => i.name).slice(0, 10).sort()

    if (query) {
      filtered = filtered.filter(i => i.toLowerCase().includes(query))
    }

    return filtered
  })

}
