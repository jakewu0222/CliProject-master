import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TodoComponent } from './todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoService } from '../service/todo/todo.service';
import { TodoRouting } from './todo-routing.module';
import { FormsModule } from '@angular/forms';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
@NgModule({
  imports: [CommonModule, FormsModule, TodoRouting],
  declarations: [TodoComponent, TodoListComponent, TodoAddComponent, TodoDetailComponent]
})
export class TodoModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TodoModule,
      providers: [TodoService]
    };
  }
}
