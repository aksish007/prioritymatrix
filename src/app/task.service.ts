import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './models/task.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5001/api/tasks';
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private matrixTasks: Task[] = [];
  private matrixTasksSubject = new BehaviorSubject<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  private loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe(tasks => {
      this.tasks = tasks;
      this.tasksSubject.next(this.tasks);
    });
  }

  addTask(task: Task) {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(newTask => {
        this.tasks.push(newTask);
        this.tasksSubject.next(this.tasks);
      })
    );
  }

  updateTask(updatedTask: Task) {
    return this.http.put<Task>(`${this.apiUrl}/${updatedTask._id}`, updatedTask).pipe(
      tap(task => {
        const index = this.tasks.findIndex(t => t._id === task._id);
        if (index !== -1) {
          this.tasks[index] = task;
          this.tasksSubject.next(this.tasks);
        }
      })
    );
  }

  deleteTask(taskId: string) {
    return this.http.delete(`${this.apiUrl}/${taskId}`).pipe(
      tap(() => {
        this.tasks = this.tasks.filter(task => task._id !== taskId);
        this.tasksSubject.next(this.tasks);
      })
    );
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

  private saveTasks() {
    // Implement the logic to save tasks, e.g., saving to local storage or making an API call
    this.http.post(`${this.apiUrl}/save`, { tasks: this.tasks, matrixTasks: this.matrixTasks }).subscribe({
      next: response => console.log('Tasks saved successfully'),
      error: err => console.error('Error saving tasks', err)
    });

  }
}
