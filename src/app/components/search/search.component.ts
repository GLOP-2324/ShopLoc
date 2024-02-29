import { Component } from '@angular/core';
import { SearchService } from "../../shared/service/SearchService";
import { SharedService } from "../../shared/service/SharedService";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchTerm: string = '';

  constructor(
    private sharedService: SharedService,
    private searchService: SearchService
  ) { }

  onSubmit(value: string) {
    this.sharedService.setCurrentObject(value);
  }

  onSearchInput(value: string) {
    if (!value.trim()) {
      this.searchTerm = '';
      this.sharedService.setCurrentObject(value);
    }
  }

  clearSearchInput(inputElement: HTMLInputElement) {
    inputElement.value = '';
    this.onSearchInput('');
  }
}
