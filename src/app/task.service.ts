import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './models/task.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5001/api/tasks';
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private matrixTasks: Task[] = [];
  private matrixTasksSubject = new BehaviorSubject<Task[]>([]);

  private userId: string | null = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.userId$.subscribe(userId => {
      this.userId = userId;
      if (userId) {
        this.loadTasks(userId);
      } else {
        this.tasks = [];
        this.matrixTasks = [];
        this.tasksSubject.next([]);
        this.matrixTasksSubject.next([]);
      }
    });
  }

  private loadTasks(userId: string) {
    this.http.get<Task[]>(`${this.apiUrl}/${userId}`).subscribe(tasks => {
      this.matrixTasks = tasks.filter(task => task.isMatrixTask);
      this.tasks = tasks.filter(task => !task.isMatrixTask);
      
      this.tasksSubject.next(this.tasks);
      this.matrixTasksSubject.next(this.matrixTasks);
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
    if (!this.userId) return;

    const allTasks = [...this.tasks, ...this.matrixTasks].map(task => ({
      ...task,
      isMatrixTask: this.matrixTasks.includes(task),
      userId: this.userId
    }));

    this.http.post(`${this.apiUrl}/batch`, { tasks: allTasks }).subscribe({
      next: response => console.log('Tasks saved successfully'),
      error: err => console.error('Error saving tasks', err)
    });
  }
}
