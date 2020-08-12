import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Calendar } from '../calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(private service: AppService) { }

  calendar: Calendar[];

  ngOnInit(): void {
    this.getCalendar();
  }

  getCalendar(): void {
    this.service.getCalendar().subscribe(calendar => this.calendar = calendar);
  }

}
