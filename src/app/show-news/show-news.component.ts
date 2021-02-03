import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { News } from '../news';

@Component({
  selector: 'app-show-news',
  templateUrl: './show-news.component.html',
  styleUrls: ['./show-news.component.css']
})
export class ShowNewsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private location: Location
  ) { }

  id = 0
  news: News[];

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getNews(this.id);
  }

  getNews(id: number){
    this.service.getNews(id).subscribe(news => this.news = news);
  }

}
