import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TodoService {
  private todoStore$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(
    Array<Todo>()
  );
  // public variable let component can subscribe
  todoList$: Observable<Todo[]> = this.todoStore$.asObservable();
  private todoApiUrl = 'http://localhost:3000/todo';

  constructor(private _http: HttpClient, private _router: Router) {}
  // get todoList from api and update todoStore$ by using next()
  getTodoList(forceRefresh?: boolean) {
    // if todoStore is empty or need to refresh then get from api
    if (this.todoStore$.value.length === 0 || forceRefresh) {
      this._http.get<Todo[]>(this.todoApiUrl).subscribe(res => {
        this.todoStore$.next(res);
      });
    }
  }
  // using find to get specific object
  getTodo(id: number) {
    if (this.todoStore$.value.length === 0) {
      this.getTodoList();
    }
    return this.todoStore$.value.find(todo => todo.id === id);
  }
  addTodo(newTodo: NewTodo) {
    this._http.post(this.todoApiUrl, newTodo).subscribe(
      res => {},
      err => console.log(err),
      () => {
        // when post completed navigate to list component
        this._router.navigateByUrl('todo/list');
      }
    );
  }
  updateTodo(editTodo: Todo) {
    this._http
      .patch(`${this.todoApiUrl}/${editTodo.id}`, {
        description: editTodo.description,
        editedTime: editTodo.editedTime
      })
      .subscribe(
        res => {},
        err => console.log(err),
        () => {
          // when patch completed navigate to list component
          this._router.navigateByUrl('todo/list');
        }
      );
  }
  // delete doesn't navigate to any component so it won't trigged ngOninit()
  deleteTodo(id: number) {
    const editedTime = new Date();
    this._http.delete(`${this.todoApiUrl}/${id}`).subscribe(
      res => {},
      err => console.log(err),
      () => {
        //  force getTodoList to update todoStore$
        this.getTodoList(true);
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
