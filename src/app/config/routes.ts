import { Routes } from '@angular/router';
import { TestComponent } from '../components/test/test.component';
import { HomeComponent } from '../components/home/home.component';
import { SearchComponent } from '../components/search/search.component';
import { ListComponent } from '../components/list/list.component';
import { NotFoundComponent } from '../components/notfound/notfound.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'list', component: ListComponent },
  {
    path: 'test',
    component: TestComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

export default appRoutes;
