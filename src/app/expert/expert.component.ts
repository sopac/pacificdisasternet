import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { Expert } from '../expert';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private location: Location
  ) { }

  //mat-table
  displayedColumns: string[] = ['Name', 'Title', 'Ministry', 'Country', 'Email'];

  experts: Expert[];

  ngOnInit(): void {
    this.getExperts();
  }

  getExperts() {
    this.service.getExperts().subscribe(experts => this.experts = experts);
  }

}
