import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchResultPagination } from '../../contracts/search-result-pagination';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {
  @Output() searchPhoto: EventEmitter<NgForm> = new EventEmitter<NgForm>();
  @Input() loading: boolean;
  @Input() pagination: SearchResultPagination = null;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.searchPhoto.emit(form.value.query);
  }
}
