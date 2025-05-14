import {Component, computed, inject, signal} from '@angular/core';
import {CommonModule} from "@angular/common"
import {HttpClient} from "@angular/common/http"
import {catchError, of} from 'rxjs'

type Country = {
  name: string
  region: string
  population: number
  capital: string
  language: string
}

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent {
  private readonly http = inject(HttpClient)

  countries = signal<Country[]>([])
  query = signal('')
  region = signal('all')
  sortAsc = signal(true)
  page = signal(0)
  loading = signal(false)
  error = signal<string | null>(null)

  perPage = 10

  constructor() {
    this.fetchCountries()
  }

  fetchCountries() {
    this.loading.set(true)
    this.error.set(null)
    this.http
      .get<any[]>('https://restcountries.com/v3.1/all')
      .pipe(
        catchError((err) => {
          this.error.set('Failed to fetch countries. Please check your connection.')
          this.loading.set(false)
          return of([])
        })
      )
      .subscribe(data => {
      const parsed = data.map(item => ({
        name: item.name.common,
        region: item.region,
        population: item.population,
        capital: item.capital?.[0] || '—',
        language: item.languages ? Object.values(item.languages)[0] : '—',
      })) as Country[]

      this.countries.set(parsed)
      this.loading.set(false)
    })
  }

  readonly filteredList = computed(() => {
    const q = this.query().toLowerCase()
    const r = this.region()
    const asc = this.sortAsc()
    const all = this.countries()

    let filtered = all.filter(c =>
      c.name.toLowerCase().includes(q) &&
      (r === 'all' || c.region === r)
    )

    filtered = [...filtered].sort((a, b) =>
      asc ? a.population - b.population : b.population - a.population
    )

    const start = this.page() * this.perPage
    return filtered.slice(start, start + this.perPage)
  })

  readonly canNext = computed(() => {
    return (this.page() + 1) * this.perPage < this.countries().length
  })

  toggleSort = () => this.sortAsc.update(s => !s)
  nextPage = () => this.page.update(p => p + 1)

  onSearchInput(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);
  }

  onRegionChange(event: Event) {
    this.setRegion((event.target as HTMLSelectElement).value);
  }

  setRegion = (region: string) => {
    this.region.set(region)
    this.page.set(0)
  }
}
