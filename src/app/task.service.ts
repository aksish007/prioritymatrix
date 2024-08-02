import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = this.loadTasks();
  private matrixTasks: Task[] = this.loadMatrixTasks();
  private matrixTasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.matrixTasks);

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('matrixTasks', JSON.stringify(this.matrixTasks));
  }

  private loadTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  private loadMatrixTasks(): Task[] {
    const tasks = localStorage.getItem('matrixTasks');
    return tasks ? JSON.parse(tasks) : [];
  }

  constructor() {
    this.matrixTasksSubject.next(this.matrixTasks);
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  updateTask(updatedTask: Task) {
    const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex > -1) {
      this.tasks[taskIndex] = updatedTask;
    }
    this.saveTasks();
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getMatrixTasks(): Observable<Task[]> {
    return this.matrixTasksSubject.asObservable();
  }

  getTasksByQuadrant() {
    return [
      {
        title: 'Urgent and Important',
        tasks: this.matrixTasks.filter((task) => task.urgent >= 4 && task.important >= 4),
      },
      {
        title: 'Not Urgent but Important',
        tasks: this.matrixTasks.filter((task) => task.urgent < 4 && task.important >= 4),
      },
      {
        title: 'Urgent but Not Important',
        tasks: this.matrixTasks.filter((task) => task.urgent >= 4 && task.important < 4),
      },
      {
        title: 'Not Urgent and Not Important',
        tasks: this.matrixTasks.filter((task) => task.urgent < 4 && task.important < 4),
      },
    ];
  }

  autoSortTasks() {
    this.matrixTasks = [...this.matrixTasks, ...this.tasks];
    this.tasks = [];
    this.matrixTasksSubject.next(this.matrixTasks);
    this.saveTasks();
  }

  resetMatrix() {
    this.tasks = [...this.tasks, ...this.matrixTasks];
    this.matrixTasks = [];
    this.matrixTasksSubject.next(this.matrixTasks);
    this.saveTasks();
  }

  updateTasks(quadrants: { title: string; tasks: Task[] }[]) {
    this.matrixTasks = quadrants.flatMap((q) => q.tasks);
    this.matrixTasksSubject.next(this.matrixTasks);
    this.saveTasks();
  }
}
