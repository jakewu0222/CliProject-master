import { Component, OnInit } from '@angular/core';
import { TodoService, Todo } from '../../service/todo/todo.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList: Observable<Todo[]> = this._todoService.todoList;
  constructor(private _router: Router, private _todoService: TodoService) {}

  ngOnInit() {
    this._todoService.getTodoList();
  }
  toAdd(): void {
    this._router.navigateByUrl('todo/add');
  }
  toDetail(id: number): void {
    this._router.navigateByUrl(`todo/detail/${id}`);
  }
  doDelete(id: number): void {
    this._todoService.deleteTodo(id);
  }
}
