import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppService } from '../app.service';
import { Counter } from '../counter';
import { LatestDocument } from '../latest-document';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  constructor(private service: AppService) { }

  documents: LatestDocument[];
  documentCount: Counter[];


  page: number;

  ngOnInit(): void {
    this.getDocumentCount();
    this.page = 0;
    this.listDocuments(this.page);
  }

  getDocumentCount(): void {
    this.service.getDocumentCount().subscribe(documentCount => this.documentCount = documentCount);
  }

  listDocuments(page: number): void {
    this.service.listDocuments(page).subscribe(documents => this.documents = documents);
  }

  next(event) {
    this.page = this.page + 1;
    this.listDocuments(this.page);
  }

  previous(event) {
    this.page = this.page - 1;
    this.listDocuments(this.page);
  }


}
