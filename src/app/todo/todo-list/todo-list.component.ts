import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Todo, TodoService } from '../../service/todo/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todoList: Todo[];
  todoListSub$ = this._todoService.todoList$.subscribe(
    res => (this.todoList = res)
  );
  constructor(private _router: Router, private _todoService: TodoService) {}

  ngOnInit() {
    this._todoService.getTodoList(true);
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
