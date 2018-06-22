import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { FlickrSearchService } from '../../services/flickr-search.service';
import { SearchResultPhoto } from '../../models/search-result-photo';
import { SearchResultPagination } from '../../contracts/search-result-pagination';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  searchText = ''; // For load more pagination
  loading = false;
  photos: SearchResultPhoto[] = [];
  pagination: SearchResultPagination = null;
  iteration = 1;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private flickrService: FlickrSearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.handleBackState();
  }

  handleBackState() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (typeof params.text !== 'undefined') {
        this.searchText = params.text;
        if (typeof params.page === 'undefined') {
          this.flickrService.loadMore(this.searchText, '1').subscribe(result => this.handleResponse(result));
        } else {
          this.initializeBackstateData(params.text, params.page);
        }
      }
    });
  }

  initializeBackstateData(text: string, page) {
    if (this.iteration <= page) {
      this.flickrService.loadMore(text, String(this.iteration)).subscribe(result => {
        this.handleResponse(result);
        this.iteration += 1;
        this.initializeBackstateData(text, page);
      });
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.scrollAtBottom() && this.hasNextPage() && false === this.loading) {
      this.loading = true;
      const nextPage = String(this.pagination.page + 1);
      this.flickrService.loadMore(this.searchText, nextPage).subscribe(result => {
        this.handleResponse(result);
        this.updateQueryParams(this.searchText, nextPage);
      });
    }
  }

  searchPhoto(text: string) {
    this.photos = [];
    this.loading = true;
    this.searchText = text;
    this.updateQueryParams(this.searchText);
    this.flickrService.searchPhoto(this.searchText).subscribe(result => this.handleResponse(result));
  }

  private handleResponse(searchResult) {
    this.photos.push(...searchResult.photos);
    this.pagination = Object.assign({}, {
      page: searchResult.page,
      pages: searchResult.pages,
      perpage: searchResult.perpage,
      total: searchResult.total
    });
    this.loading = false;
  }

  private scrollAtBottom(): boolean {
    return (window.innerHeight + window.scrollY) >= this.document.body.offsetHeight - 400;
  }

  private hasNextPage() {
    if (null === this.pagination) {
      return false;
    }
    return this.pagination.page < this.pagination.pages;
  }

  private updateQueryParams(text: string, page: string|number = 1) {
    this.location.replaceState(`?text=${text}&page=${page}`);
    // this.router.navigate([], { relativeTo: this.activatedRoute, queryParams: queryParams });
  }
}
