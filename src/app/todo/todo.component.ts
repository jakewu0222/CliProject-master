import { Component, OnInit } from '@angular/core';
import { TodoService } from '../service/todo/todo.service';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  constructor(private _todoService: TodoService) {}

  ngOnInit() {}
}
