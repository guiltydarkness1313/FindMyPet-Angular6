import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service'
import {Task} from '../../Task'
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
task:Task[];
title:string;
  constructor(private taskService:TaskService) {
    this.taskService.getTask().subscribe(tasks=> {
      this.task=tasks;
      console.log(this.task)
    });
  }

  ngOnInit() {
    console.log(this.task)
  }

  addTask(event){
    event.preventDefault();
    console.log(this.title);
    const newTask:Task={
      title:this.title,
      isDone:false
    };
    this.taskService.addTask(newTask).subscribe(task=> {
      this.task.push(task);
      console.log(this.task);
      this.title = '';
    });
  }
  deleteTask(id) {
    const res = confirm('are you sure to delete it?');
    if (res) {
      console.log(id);
      const task = this.task;
      this.taskService.deleteTask(id)
        .subscribe(data => {
          console.log(data);
          if (data.n == 1) {
            for (let i = 0; i < task.length; i++) {
              if (task[i]._id == id) {
                task.splice(i, 1);
              }
            }
          }
        });
    }
    return;
  }
  updateTask(task:Task){
    console.log(task);
    const newTask={
      _id:task._id,
      title:task.title,
      isDone:!task.isDone
    };
    this.taskService.updateTask(newTask)
      .subscribe(res=>{
        task.isDone= !task.isDone
      });
  }
}
