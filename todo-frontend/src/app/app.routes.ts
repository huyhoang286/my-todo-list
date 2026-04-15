import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { 
    path: 'tasks/:filter', 
    component: TaskListComponent 
  },
  {
    path: '',
    redirectTo: 'tasks/all',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tasks/all'
  }
];
