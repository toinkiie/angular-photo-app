import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResultPhoto } from '../../models/search-result-photo';
import { SearchResultPagination } from '../../contracts/search-result-pagination';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() photos: SearchResultPhoto[];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onClick(id: number) {
    this.router.navigate([`/details/${id}`]);
  }
}
