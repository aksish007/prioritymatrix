import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { Subscription } from 'rxjs';

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
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    DragDropModule,
    NgxSliderModule,
  ],
})
export class InputTaskComponent implements OnInit, OnDestroy {
  id: number | null = null;
  title: string = '';
  description: string = '';
  urgent: number = 1;
  important: number = 1;
  tasks: Task[] = [];
  isEditMode: boolean = false;
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

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasksSubscription = this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  addOrUpdateTask() {
    const task: Task = {
      id: this.id ?? Date.now(),
      title: this.title,
      description: this.description,
      urgent: this.urgent,
      important: this.important,
    };

    if (this.isEditMode) {
      this.taskService.updateTask(task);
    } else {
      this.taskService.addTask(task);
    }

    this.resetForm();
  }

  editTask(task: Task) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.urgent = task.urgent;
    this.important = task.important;
    this.isEditMode = true;
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }

  autoSort() {
    this.taskService.autoSortTasks();
  }

  resetForm() {
    this.id = null;
    this.title = '';
    this.description = '';
    this.urgent = 1;
    this.important = 1;
    this.isEditMode = false;
  }

  ngOnDestroy() {
    this.tasksSubscription?.unsubscribe();
  }
}
