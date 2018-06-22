import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule, Http } from '@angular/http';

import { FlickrService } from './services/flickr.service';
import { PhotoPathPipe } from './pipes/photo-path.pipe';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FlickrSearchService } from './services/flickr-search.service';
import { PageStatsComponent } from './components/page-stats/page-stats.component';
import { PageLoadingComponent } from './components/page-loading/page-loading.component';
import { FirstLetterPipe } from './pipes/first-letter.pipe';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { StripTagsPipe } from './pipes/strip-tags.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    PhotoDetailsComponent,
    HomePageComponent,
    DetailsPageComponent,
    SearchResultsComponent,
    PhotoPathPipe,
    PageStatsComponent,
    PageLoadingComponent,
    FirstLetterPipe,
    SanitizePipe,
    StripTagsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    FlickrService,
    FlickrSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
