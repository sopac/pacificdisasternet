import { Component, OnInit } from '@angular/core';
import { Country } from './country';
import { AppService } from './app.service';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Pacific Disaster Net and Pacific Damage Loss Assessment';

  countries: Country[];
  countrySelect = new FormControl();
  selectedId = '';


  constructor(private service: AppService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(): void {
    this.service.getCountries().subscribe(countries => this.countries = countries);
  }

  onCountryChanged(e){
    //console.log(this.selectedId);
    this.router.navigateByUrl('/country/' + this.selectedId, {relativeTo: this.route})
    
  }




}
