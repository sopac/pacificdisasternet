import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { Disaster } from '../disaster';


@Component({
  selector: 'app-show-disaster',
  templateUrl: './show-disaster.component.html',
  styleUrls: ['./show-disaster.component.css']
})
export class ShowDisasterComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private location: Location
  ) { }

  id = 0;
  disaster: Disaster[];


  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getDisaster(this.id);
  }

  getDisaster(id: number) {
    this.service.getDisaster(id).subscribe(disaster => this.disaster = disaster);
  }

}
