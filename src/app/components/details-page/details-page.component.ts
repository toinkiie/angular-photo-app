import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../../services/flickr.service';
import { ActivatedRoute } from '@angular/router';
import { PhotoInfo } from '../../services/photo-info.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {
  photo: PhotoInfo|null = null;

  constructor(
    private flickrService: FlickrService,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.initInfo();
  }

  initInfo() {
    this.activeRoute.params.subscribe(routeParams => this.getInfo(routeParams.id));
  }

  goBack(): void {
    this.location.back();
  }

  getInfo(id) {
    this.flickrService.getInfo(id).subscribe(photo => this.photo = photo);
  }
}
