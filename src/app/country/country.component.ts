import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { CountryProfile } from '../country-profile';
import { Document } from '../document';
import { Expert } from '../expert';
import { News } from '../news';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private location: Location
  ) { }

  id = 0;
  profile: CountryProfile[];
  experts: Expert[];
  actionPlans: Document[];
  documents: Document[];
  news: News[];

  //mat-table
  displayedColumns: string[] = ['Name', 'Title', 'Ministry', 'Country', 'Email'];


  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +this.route.snapshot.paramMap.get('id');
        this.getCountryProfile(this.id);
        this.getExpertsByCountryCode(this.id);
        this.getDisasterPlansByCountryId(this.id);
        this.getDocumentsByCountryId(this.id);
        
      });

    this.id = +this.route.snapshot.paramMap.get('id');
    this.getCountryProfile(this.id);
    this.getExpertsByCountryCode(this.id);
    this.getDisasterPlansByCountryId(this.id);
    this.getDocumentsByCountryId(this.id);
   
  }

  getCountryProfile(id: number) {
    this.service.getCountryProfile(id).subscribe(profile => {
      this.profile = profile
      var code = this.profile[0].code
      this.getNewsByCountryCode(code)
    });
  }

  getExpertsByCountryCode(id: number) {
    this.service.getExpertsByCountryCode(id).subscribe(experts => this.experts = experts)
  }

  getDisasterPlansByCountryId(id: number) {
    this.service.getDisasterPlansByCountryId(id).subscribe(actionPlans => this.actionPlans = actionPlans)
  }

  getDocumentsByCountryId(id: number) {
    this.service.getDocumentsByCountryId(id).subscribe(documents => this.documents = documents)
  }

  getNewsByCountryCode(code: string){
    this.service.getNewsByCountryCode(code).subscribe(news => this.news = news)
  }



}
