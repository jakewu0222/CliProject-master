import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class TodoService {
  private todoStore: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(
    new Array<Todo>()
  );
  todoList: Observable<Todo[]> = this.todoStore;
  private todoApiUrl = 'http://localhost:3000/todo';
  constructor(private _http: HttpClient) {}
  getTodoList() {
    this._http.get<Todo[]>(this.todoApiUrl).subscribe(res => {
      console.log(this.todoStore.getValue());
      this.todoStore.next(res);
    });
  }
  getTodo(id: number) {
    this._http
      .get(`${this.todoApiUrl}?id=${id}`)
      .subscribe(res => this.todoStore.next(res[0]));
  }
  addTodo(newTodo: NewTodo) {
    this._http.post(this.todoApiUrl, newTodo).subscribe(res => {
      console.log(this.todoStore.getValue());
      this.todoStore.next([...this.todoStore.getValue(), res as Todo]);
    });
  }
  updateTodo(id: number, description: string) {
    const editedTime = new Date();
    this._http
      .patch(`${this.todoApiUrl}/${id}`, {
        description: description,
        editedTime: editedTime
      })
      .subscribe(res => this.todoStore.next([...this.todoStore.getValue()]));
  }
  deleteTodo(id: number) {
    const editedTime = new Date();
    this._http.delete(`${this.todoApiUrl}/${id}`).subscribe();
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
