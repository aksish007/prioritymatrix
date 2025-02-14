import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Subscription } from 'rxjs';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AuthService } from '../services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-input-task',
  templateUrl: './input-task.component.html',
  styleUrls: ['./input-task.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    DragDropModule,
    NgxSliderModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
})
export class InputTaskComponent implements OnInit, OnDestroy {
  id: number | null = null;
  userId: string = '';
  title: string = '';
  description: string = '';
  urgent: number = 1;
  important: number = 1;
  tasks: Task[] = [];
  isEditMode: boolean = false;
  editedTaskId: string | null = null;
  tasksSubscription: Subscription | null = null;
  urgentOptions: Options = {
    floor: 1,
    ceil: 5,
    step: 1,
    showTicks: true
  };

  importantOptions: Options = {
    floor: 1,
    ceil: 5,
    step: 1,
    showTicks: true
  };

  isMobile: boolean = false;

  @ViewChild('taskForm') taskForm!: NgForm;
  
  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private deviceService: DeviceDetectorService
  ) {
    this.isMobile = this.deviceService.isMobile();
  }

  ngOnInit() {
    this.tasksSubscription = this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.sortTasks();
    });
    this.authService.userId$.subscribe(userId => {
      this.userId = userId ?? '';
    });
  }

  private sortTasks() {
    this.tasks.sort((a, b) => +new Date(b.createdAt!) - +new Date(a.createdAt!));
  }
  

  addOrUpdateTask() {
    // Validate form only when adding new task
    if (!this.isEditMode && this.taskForm?.invalid) {
      this.snackBar.open('Please fill in all required fields', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      return;
    }
    
    // Validate required fields for both add and edit
    if (!this.title.trim() || !this.description.trim()) {
      this.snackBar.open('Title and description are required', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
      return;
    }
    const task: Task = {
      _id: this.editedTaskId ?? undefined,
      title: this.title,
      description: this.description,
      urgent: this.urgent,
      important: this.important,
      userId: this.userId
    };

    if (this.isEditMode) {
      this.taskService.updateTask(task).subscribe({
        next: () => {
          this.snackBar.open('Task updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        },
        error: (error) => {
          this.snackBar.open('Error updating task: ' + error.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
    } else {
      this.taskService.addTask(task).subscribe({
        next: () => {
          this.snackBar.open('Task added successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.sortTasks();
        },
        error: (error) => {
          this.snackBar.open('Error adding task: ' + error.message, 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
    }

    this.resetForm();
  }

  editTask(task: Task) {
    // Create a copy of the task to prevent direct binding
    this.editedTaskId = task._id ?? null;
    this.title = task.title;
    this.description = task.description;
    this.urgent = task.urgent;
    this.important = task.important;
    this.isEditMode = true;
    
    // Scroll to the edited task
    setTimeout(() => {
      const element = document.querySelector('.editing');
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  deleteTask(taskId?: string) {
    if(taskId)
    {
      this.taskService.deleteTask(taskId).subscribe(() => {
        if (this.editedTaskId === taskId) {
          this.resetForm();
        }
      });
    }
  }

  autoSort() {
    this.taskService.autoSortTasks();
  }

  clearAll() {
    this.tasks = [];
    this.taskService.clearAllTasks();
  }

  cancelEdit() {
    this.resetForm();
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.urgent = 1;
    this.important = 1;
    this.isEditMode = false;
    this.editedTaskId = null;
    
    // Reset the form validation state if form exists
    if (this.taskForm) {
      this.taskForm.resetForm({
        urgent: 1,
        important: 1
      });
    }
  }

  ngOnDestroy() {
    this.tasksSubscription?.unsubscribe();
  }
}
