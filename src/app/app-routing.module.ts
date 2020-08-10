import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisasterComponent } from './disaster/disaster.component';
import { ProjectComponent } from './project/project.component';


const routes: Routes = [
  { path: 'pdalo', component: DisasterComponent },
  { path: 'projects', component: ProjectComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
