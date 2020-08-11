import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisasterComponent } from './disaster/disaster.component';
import { ProjectComponent } from './project/project.component';
import { DocumentComponent } from './document/document.component';
import { MainComponent } from './main/main.component';
import { ExpertComponent } from './expert/expert.component';
import { NewsComponent } from './news/news.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ShowDocumentComponent } from './show-document/show-document.component';
import { ShowDisasterComponent } from './show-disaster/show-disaster.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'pdalo', component: DisasterComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'documents', component: DocumentComponent },
  { path: 'experts', component: ExpertComponent },
  { path: 'news', component: NewsComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'document/:id', component: ShowDocumentComponent },
  { path: 'disaster/:id', component: ShowDisasterComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }, // redirect to MainComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
