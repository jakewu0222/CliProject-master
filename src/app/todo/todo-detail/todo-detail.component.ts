import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { TodoService, Todo } from '../../service/todo/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
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
      if (value['id'] === this.id) {
        this.title = value['title'];
        this.description = value['description'];
      }
    });
  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
  }
  doEdit() {
    const editedTime = new Date();
    this._todoService.updateTodo(this.id, this.description);
    this._router.navigateByUrl('/todo/list');
  }
  doBack() {
    this._router.navigateByUrl('/todo/list');
  }
  ngOnDestroy() {
    this.idSub.unsubscribe();
  }
}
