import { Component, OnInit } from '@angular/core';
import { Country } from './country';
import { AppService } from './app.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Pacific Disaster Net and Pacific Damage Loss Assessment';

  countries: Country[];
  countrySelect = new FormControl();
  selected = 'Tonga';


  constructor(private service: AppService) { }

  ngOnInit() {
    this.getCountries();
  }

  getCountries(): void {
    this.service.getCountries().subscribe(countries => this.countries = countries);
  }




}
