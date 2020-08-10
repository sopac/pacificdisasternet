import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Project } from '../project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: Project[] = [];

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.getProjects();
  }


  getProjects(): void {
    this.service.getProjects().subscribe(projects => this.projects = projects);
  }

}
