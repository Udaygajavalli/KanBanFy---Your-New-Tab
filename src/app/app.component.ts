import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'kanbanify-yournewtab';
  tasks: any;
  constructor() {
    if (localStorage.getItem('tasks') == null) {
      let tasks = {
        todo: [],
        doing: [],
        done: [],
      };
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  ngOnInit() {
    console.log('nngonit');

    function getStorage(): Observable<any> {
      return of(JSON.parse(localStorage.getItem('tasks')));
    }

    getStorage().subscribe((val) => {
      this.tasks = val;
      console.log('done');
    });
    console.log('close ngonit');
  }
  onSubmit(task: NgForm) {
    this.tasks.todo.push(task.value);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    task.reset();
  }
  delete(id: any) {
    this.tasks.done.splice(id, 1);
    console.log(this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
