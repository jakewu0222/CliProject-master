import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserService } from '../service/core/user/user.service';
import { TodoComponent } from './todo.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
const routes: Routes = [
  {
    path: '',
    component: TodoComponent,
    children: [
      {
        path: 'list',
        component: TodoListComponent
      },
      {
        path: 'add',
        component: TodoAddComponent
      },
      {
        path: 'detail/:id',
        component: TodoDetailComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404'
  }
];
export const TodoRouting: ModuleWithProviders = RouterModule.forChild(routes);
