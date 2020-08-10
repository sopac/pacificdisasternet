import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { Document } from '../document';


@Component({
  selector: 'app-show-document',
  templateUrl: './show-document.component.html',
  styleUrls: ['./show-document.component.css']
})
export class ShowDocumentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: AppService,
    private location: Location
  ) { }

  id = 0;
  doc: Document[];
 

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getDocument(this.id);
  }

  getDocument(id: number){
    this.service.getDocument(id).subscribe(doc => this.doc = doc);
  }

}
