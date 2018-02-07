import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Todo, TodoService } from '../../service/todo/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  id: number;
  todo: Observable<Todo[]> = this._todoService.todoList;
  title = '';
  description = '';
  @ViewChild('inputDescription') private elementRef: ElementRef;
  idSub: any;
  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _todoService: TodoService
  ) {}

  ngOnInit() {
    this.idSub = this._activatedRouter.params.subscribe(
      params => (this.id = +params['id'])
    );
    this._todoService.getTodo(this.id);
    this.todo.forEach(value => {
      if (value.length !== 0 && value[0]['id'] === this.id) {
        this.title = value[0]['title'];
        this.description = value[0]['description'];
      }
    });
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
  doEdit() {
    const editedTime = new Date();
    this._todoService.updateTodo(this.id, this.description);
  }
  doBack() {
    this._router.navigateByUrl('/todo/list');
  }
  ngOnDestroy() {
    this.idSub.unsubscribe();
  }
}
