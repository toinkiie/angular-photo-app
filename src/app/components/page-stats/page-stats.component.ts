import { Component, OnInit, Input } from '@angular/core';
import { SearchResultPagination } from '../../contracts/search-result-pagination';

@Component({
  selector: 'app-page-stats',
  templateUrl: './page-stats.component.html',
  styleUrls: ['./page-stats.component.css']
})
export class PageStatsComponent implements OnInit {
  @Input() pagination: SearchResultPagination = null;
  constructor() { }

  ngOnInit() {
  }

}
