import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Counter } from './counter';
import { Featured } from './featured';
import { LatestDocument } from './latest-document';
import { RecentAlerts } from './recent-alerts';
import { Disaster } from './disaster';
import { Project } from './project';
import { Chart1 } from './chart1';
import { Document } from './document';
import { Country } from "./country";
import { Expert } from './expert';
import { Calendar } from './calendar';

import { MessageService } from './message.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private serviceUrl = 'http://localhost:3000/';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
    if (environment.production) {
      this.serviceUrl = 'http://www.pacificdisaster.net/api/';
    }
  }

  getDisaster(id: number): Observable<Disaster[]> {
    //pdalo?id=eq.95984
    const url = `${this.serviceUrl}`;
    return this.http.get<Disaster[]>(url + "pdalo?Id=eq." + id).pipe(
      tap(_ => this.log(`fetched single disaster`)),
      catchError(this.handleError<Disaster[]>(`getDisaster`))
    );
  }

  listDocuments(page: number): Observable<LatestDocument[]> {
    const url = `${this.serviceUrl}`;
    const offset = page * 20;
    return this.http.get<LatestDocument[]>(url + "document?select=id,title,publicationyear,uploaddate&limit=20&order=id.desc&offset=" + offset).pipe(
      tap(_ => this.log(`fetched document list`)),
      catchError(this.handleError<LatestDocument[]>(`listDocuments`, []))
    );
  }

  getDocument(id: number): Observable<Document[]> {
    //document?id=eq.95984
    const url = `${this.serviceUrl}`;
    return this.http.get<Document[]>(url + "document?id=eq." + id).pipe(
      tap(_ => this.log(`fetched single document`)),
      catchError(this.handleError<Document[]>(`getDocument`))
    );
  }

  getCalendar(): Observable<Calendar[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Calendar[]>(url + "calendar?order=enddate.desc&limit=8").pipe(
      tap(_ => this.log(`fetched calendar`)),
      catchError(this.handleError<Calendar[]>(`getCalendar`, []))
    );
  }

  getSingleCalendar(id: number): Observable<Calendar[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Calendar[]>(url + "calendar?id=eq." + id).pipe(
      tap(_ => this.log(`fetched single calendar`)),
      catchError(this.handleError<Calendar[]>(`getSingleCalendar`, []))
    );
  }


  getProjects(): Observable<Project[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Project[]>(url + "project").pipe(
      tap(_ => this.log(`fetched projects`)),
      catchError(this.handleError<Project[]>(`getProjects`, []))
    );
  }


  getChartType(): Observable<Chart1[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Chart1[]>(url + "chart_disaster_type").pipe(
      tap(_ => this.log(`fetched chart disaster type`)),
      catchError(this.handleError<Chart1[]>(`getChartType`, []))
    );
  }


  getChartCountry(): Observable<Chart1[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Chart1[]>(url + "chart_disaster_country").pipe(
      tap(_ => this.log(`fetched chart disaster country`)),
      catchError(this.handleError<Chart1[]>(`getChartCountry`, []))
    );
  }


  getCountries(): Observable<Country[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Country[]>(url + "country?limit=23").pipe(
      tap(_ => this.log(`fetched countries`)),
      catchError(this.handleError<Country[]>(`getCountries`, []))
    );
  }

  getExperts(): Observable<Expert[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Expert[]>(url + "experts?order=Country").pipe(
      tap(_ => this.log(`fetched experts`)),
      catchError(this.handleError<Expert[]>(`getExperts`, []))
    );
  }


  getDisasters(): Observable<Disaster[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Disaster[]>(url + "pdalo?order=Year.desc").pipe(
      tap(_ => this.log(`fetched disasters`)),
      catchError(this.handleError<Disaster[]>(`getDisasters`, []))
    );
  }

  getRecentDisasters(): Observable<Disaster[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Disaster[]>(url + "pdalo?order=Year.desc&limit=6").pipe(
      tap(_ => this.log(`fetched recent disasters`)),
      catchError(this.handleError<Disaster[]>(`getRecentDisasters`, []))
    );
  }


  getRecentAlerts(): Observable<RecentAlerts[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<RecentAlerts[]>(url + "recent_alerts?select=id,title,gdacs_country,gdacs_eventtype,gdacs_eventid&limit=6").pipe(
      tap(_ => this.log(`fetched recent alerts`)),
      catchError(this.handleError<RecentAlerts[]>(`getRecentAlerts`, []))
    );
  }


  getLatestDocument(): Observable<LatestDocument[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<LatestDocument[]>(url + "document?select=id,title,publicationyear,uploaddate&limit=5&order=id.desc").pipe(
      tap(_ => this.log(`fetched latest document`)),
      catchError(this.handleError<LatestDocument[]>(`getLatestDocument`, []))
    );
  }

  getFeatured(): Observable<Featured[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Featured[]>(url + "document?featured=eq.1&select=id,title&limit=7").pipe(
      tap(_ => this.log(`fetched featured`)),
      catchError(this.handleError<Featured[]>(`getFeatured`, []))
    );
  }


  getDocumentCount(): Observable<Counter[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Counter[]>(url + "count_document").pipe(
      tap(_ => this.log(`fetched count`)),
      catchError(this.handleError<Counter[]>(`getDocumentCount`, []))
    );
  }

  getDisasterCount(): Observable<Counter[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Counter[]>(url + "count_disaster").pipe(
      tap(_ => this.log(`fetched count`)),
      catchError(this.handleError<Counter[]>(`getDisasterCount`, []))
    );
  }

  getExpertCount(): Observable<Counter[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Counter[]>(url + "count_expert").pipe(
      tap(_ => this.log(`fetched count`)),
      catchError(this.handleError<Counter[]>(`getExpertCount`, []))
    );
  }

  getCalendarCount(): Observable<Counter[]> {
    const url = `${this.serviceUrl}`;
    return this.http.get<Counter[]>(url + "count_calendar").pipe(
      tap(_ => this.log(`fetched count`)),
      catchError(this.handleError<Counter[]>(`getCalendarCount`, []))
    );
  }

  search(q: string): Observable<Document[]> {
    const tokenList = q.split(' ');
    let link = 'document?or=(';
    for (const t of tokenList) {
      link = link + 'title.phfts.' + t + ',description.phfts.' + t + ',varianttitle.phfts.' + t + ',relatednames.phfts.' + t + ',';
    }
    link = link.trim();
    link = link.substr(0, link.length - 1);
    link = link + ')';
    const url = `${this.serviceUrl}` + link;
    return this.http.get<Document[]>(url).pipe(
      tap(_ => this.log(`searched document`)),
      catchError(this.handleError<Document[]>(`search`, []))
    );
  }



  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AppService: ${message}`);
    console.log(message);
  }
}