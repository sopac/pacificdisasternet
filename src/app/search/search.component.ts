import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { Document } from '../document';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private location: Location
  ) { }

  query = '';
  link = '#';
  docs: Document[];

  ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query');
    let q = this.query;
    this.search(q);
    let tokenList = this.query.split(' ');
    let link = 'http://localhost:3000/document?or=(';
    for (let t of tokenList) {
      link = link + 'title.phfts.' + t + ',description.phfts.' + t + ',varianttitle.phfts.' + t + ',relatednames.phfts.' + t + ',';
    }
    link = link.trim();
    link = link.substr(0, link.length - 1);
    link = link + ')';
    this.link = link;
  }

  search(q: string) {
    this.service.search(q).subscribe(docs => this.docs = docs);
  }

}
