import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = this.loadTasks();
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);
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
    this.tasksSubject.next(this.tasks);
    this.matrixTasksSubject.next(this.matrixTasks);
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  updateTask(updatedTask: Task) {
    const taskIndex = this.tasks.findIndex(task => task._id === updatedTask._id);
    if (taskIndex > -1) {
      this.tasks[taskIndex] = updatedTask;
    }
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter(task => task._id !== taskId);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  getMatrixTasks(): Observable<Task[]> {
    return this.matrixTasksSubject.asObservable();
  }

  getTasksByQuadrant() {
    return [
      {
        title: 'Urgent and Important (Do)',
        tasks: this.matrixTasks.filter((task) => task.urgent >= 4 && task.important >= 4),
      },
      {
        title: 'Not Urgent but Important (Schedule)',
        tasks: this.matrixTasks.filter((task) => task.urgent < 4 && task.important >= 4),
      },
      {
        title: 'Urgent but Not Important (Delegate)',
        tasks: this.matrixTasks.filter((task) => task.urgent >= 4 && task.important < 4),
      },
      {
        title: 'Not Urgent and Not Important (Eliminate)',
        tasks: this.matrixTasks.filter((task) => task.urgent < 4 && task.important < 4),
      },
    ];
  }

  autoSortTasks() {
    this.matrixTasks = [...this.matrixTasks, ...this.tasks];
    this.tasks = [];
    this.matrixTasksSubject.next(this.matrixTasks);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  clearAllTasks() {
    this.tasks = [];
    this.matrixTasks = [];
    this.tasksSubject.next(this.tasks);
    this.matrixTasksSubject.next(this.matrixTasks);
    this.saveTasks();
  }

  resetMatrix() {
    this.tasks = [...this.tasks, ...this.matrixTasks];
    this.matrixTasks = [];
    this.matrixTasksSubject.next(this.matrixTasks);
    this.tasksSubject.next(this.tasks);
    this.saveTasks();
  }

  updateTasks(quadrants: { title: string; tasks: Task[] }[]) {
    this.matrixTasks = quadrants.flatMap((q) => q.tasks);
    this.matrixTasksSubject.next(this.matrixTasks);
    this.saveTasks();
  }
}
