import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { DisasterComponent } from './disaster/disaster.component';
import { ProjectComponent } from './project/project.component';
import { DocumentComponent } from './document/document.component';
import { MainComponent } from './main/main.component';
import { ExpertComponent } from './expert/expert.component';
import { NewsComponent } from './news/news.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ShowDocumentComponent } from './show-document/show-document.component';
import { ShowDisasterComponent } from './show-disaster/show-disaster.component';
import { ShowCalendarComponent } from './show-calendar/show-calendar.component';
import { ShowExpertComponent } from './show-expert/show-expert.component';
import { ShowNewsComponent } from './show-news/show-news.component';
import { SearchComponent } from './search/search.component';
import { CountryComponent } from './country/country.component';


@NgModule({
  declarations: [
    AppComponent,
    DisasterComponent,
    ProjectComponent,
    DocumentComponent,
    MainComponent,
    ExpertComponent,
    NewsComponent,
    CalendarComponent,
    ShowDocumentComponent,
    ShowDisasterComponent,
    ShowCalendarComponent,
    ShowExpertComponent,
    ShowNewsComponent,
    SearchComponent,
    CountryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxChartsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatBadgeModule,
    MatTableModule,
    MatSelectModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
