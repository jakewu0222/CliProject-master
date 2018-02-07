import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {
  private todoStore: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(
    Array<Todo>()
  );
  todoList: Observable<Todo[]> = this.todoStore;
  private todoApiUrl = 'http://localhost:3000/todo';
  constructor(private _http: HttpClient, private _router: Router) {}
  getTodoList() {
    console.log(this.todoStore);
    this._http.get<Todo[]>(this.todoApiUrl).subscribe(res => {
      console.log('get', res);
      this.todoStore.next(res);
    });
  }
  getTodo(id: number) {
    const value = this.todoStore.getValue();
    console.log(value.length);
    if (value.length === 0) {
      this._http
        .get<Todo[]>(`${this.todoApiUrl}?id=${id}`)
        .subscribe(res => this.todoStore.next(res));
    } else {
      this.todoStore.next(this.todoStore.value.filter(val => val.id === id));
    }
    console.log(this.todoStore, this.todoStore.getValue());
  }
  addTodo(newTodo: NewTodo) {
    this._http.post(this.todoApiUrl, newTodo).subscribe(
      res => {
        console.log('add', res);
      },
      err => console.log(err),
      () => {
        this._router.navigateByUrl('todo/list');
      }
    );
  }
  updateTodo(id: number, description: string) {
    const editedTime = new Date();
    this._http
      .patch(`${this.todoApiUrl}/${id}`, {
        description: description,
        editedTime: editedTime
      })
      .subscribe(
        res => {
          console.log('update', res);
        },
        err => console.log(err),
        () => {
          this._router.navigateByUrl('todo/list');
        }
      );
  }
  deleteTodo(id: number) {
    const editedTime = new Date();
    this._http.delete(`${this.todoApiUrl}/${id}`).subscribe(
      res => {
        console.log('delete', res);
      },
      err => console.log(err),
      () => {
        this.getTodoList();
      }
    );
  }
}
export class NewTodo {
  status: number;
  title: string;
  description: string;
  createdTime: Date;
  editedTime: Date;
}
export class Todo {
  id: number;
  status: number;
  title: string;
  description: string;
  createdTime: Date;
  editedTime: Date;
}
