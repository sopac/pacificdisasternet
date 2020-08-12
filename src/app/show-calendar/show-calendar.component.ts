import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { Calendar } from '../calendar';


@Component({
  selector: 'app-show-calendar',
  templateUrl: './show-calendar.component.html',
  styleUrls: ['./show-calendar.component.css']
})
export class ShowCalendarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private location: Location
  ) { }

  id = 0;
  calendar: Calendar[];

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getSingleCalendar(this.id);
  }

  getSingleCalendar(id: number) {
    this.service.getSingleCalendar(id).subscribe(calendar => this.calendar = calendar);
  }
}
