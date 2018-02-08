import { Component, ElementRef, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Todo, TodoService } from '../../service/todo/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit, OnChanges, OnDestroy {
  id: number;
  todo: Todo;
  todoSub$: any;
  @ViewChild('inputDescription') private elementRef: ElementRef;
  idSub$: any;
  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _todoService: TodoService
  ) {}

  ngOnInit() {
    // get id by url
    this.idSub$ = this._activatedRouter.params.subscribe(
      params => (this.id = +params['id'])
    );
    this._todoService.todoList$.subscribe(
      res => (this.todo = this._todoService.getTodo(this.id))
    );
  }
  // cause using *ngIf in html so need focus when onChanges instead of ViewInited
  ngOnChanges() {
    if (this.todo) {
      this.elementRef.nativeElement.focus();
    }
  }
  doEdit() {
    this.todo.editedTime = new Date();
    this._todoService.updateTodo(this.todo);
  }
  doBack() {
    this._router.navigateByUrl('/todo/list');
  }
  // avoid memory leak
  ngOnDestroy() {
    this.idSub$.unsubscribe();
  }
}
