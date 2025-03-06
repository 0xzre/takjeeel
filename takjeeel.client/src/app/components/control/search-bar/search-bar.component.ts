import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [IconField, InputIcon, InputTextModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input('search') search: (query: string) => void = () => {};
  @Input('placeholder') placeholder: string = 'Search...';
  @Input('query') query: string = '';

  constructor() {}


  onSearch(event: Event) {
    event.preventDefault();
    this.search(this.query);
  }
}
