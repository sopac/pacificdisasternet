import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../app.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Disaster } from '../disaster';
import { Chart1 } from '../chart1';

@Component({
  selector: 'app-disaster',
  templateUrl: './disaster.component.html',
  styleUrls: ['./disaster.component.css']
})
export class DisasterComponent implements OnInit, AfterViewInit {

  disasters: Disaster[] = [];
  disastersCountry: Chart1[] = [];
  disastersType: Chart1[] = [];

  //mat-table
  displayedColumns: string[] = ['Date', 'Description_Of_Cause', 'Event', 'Country', 'Year'];

  //ngx-charts
  single: any[];
  view: any[] = [1000, 500];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Disaster';

  constructor(private service: AppService) { }

  ngOnInit(): void {
    //this.getDisasters();
    //this.dataSource = this.disasters;
  }

  ngAfterViewInit() {
    this.getDisasters();
    this.getChartCountry();
    this.getChartType();
  }

  getChartType(): void {
    this.service.getChartType().subscribe(disastersType => this.disastersType = disastersType);
  }

  getChartCountry(): void {
    this.service.getChartCountry().subscribe(disastersCountry => this.disastersCountry = disastersCountry);
  }

  getDisasters(): void {
    this.service.getDisasters().subscribe(disasters => this.disasters = disasters);
  }

  //charts
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


}
