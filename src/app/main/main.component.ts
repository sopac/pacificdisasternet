import { Component, OnInit } from '@angular/core';
import { Counter } from '../counter';
import { Featured } from '../featured';
import { LatestDocument } from '../latest-document';
import { RecentAlerts } from '../recent-alerts';
import { AppService } from '../app.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'Pacific Disaster Net and Pacific Damage Loss Assessment';
  value = 'Search across PDN...';

  documentCount: Counter[];
  disasterCount: Counter[];
  expertCount: Counter[];
  calendarCount: Counter[];
  featuredDocuments: Featured[];
  latestDocuments: LatestDocument[];
  alerts: RecentAlerts[];

  constructor(private service: AppService) { }

  ngOnInit() {
    this.getCalendarCount();
    this.getExpertCount();
    this.getDisasterCount();
    this.getDocumentCount();
    this.getFeatured();
    this.getLatestDocument();
    this.getRecentAlerts();
  }


  getRecentAlerts(): void {
    this.service.getRecentAlerts().subscribe(alerts => this.alerts = alerts);
  }

  getLatestDocument(): void {
    this.service.getLatestDocument().subscribe(latestDocuments => this.latestDocuments = latestDocuments);
  }

  getFeatured(): void {
    this.service.getFeatured().subscribe(featuredDocuments => this.featuredDocuments = featuredDocuments);
  }

  getDocumentCount(): void {
    this.service.getDocumentCount().subscribe(documentCount => this.documentCount = documentCount);
  }

  getDisasterCount(): void {
    this.service.getDisasterCount().subscribe(disasterCount => this.disasterCount = disasterCount);
  }

  getExpertCount(): void {
    this.service.getExpertCount().subscribe(expertCount => this.expertCount = expertCount);
  }


  getCalendarCount(): void {
    this.service.getCalendarCount().subscribe(calendarCount => this.calendarCount = calendarCount);
  }



}
