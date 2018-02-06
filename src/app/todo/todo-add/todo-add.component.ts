import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../service/todo/todo.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  title = '';
  description = '';
  constructor(private _router: Router, private _todoService: TodoService) {}
  ngOnInit() {}
  doAdd(): void {
    const now = new Date();
    const newTodo = {
      status: 0,
      title: this.title,
      description: this.description,
      createdTime: now,
      editedTime: now
    };
    this._todoService.addTodo(newTodo);
    this._router.navigateByUrl('/todo/list');
  }
  doBack(): void {
    this._router.navigateByUrl('/todo/list');
  }
}
