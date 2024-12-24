import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';
import { CdkDragDrop,moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AngularSplitModule } from 'angular-split';
import { Subscription } from 'rxjs';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DragDropModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    AngularSplitModule
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class MatrixComponent implements OnInit, OnDestroy {
  quadrants: { title: string; tasks: Task[] }[] = [];
  matrixTasksSubscription: Subscription | null = null;

  getTaskRanking(quadrantIndex: number, taskIndex: number): string {
    const totalTasksInQuadrant = this.quadrants[quadrantIndex].tasks.length;
    if (totalTasksInQuadrant === 0) return '';
    return `[${taskIndex + 1}/${totalTasksInQuadrant}] `;
  }

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.matrixTasksSubscription = this.taskService.getMatrixTasks().subscribe(tasks => {
      this.quadrants = this.taskService.getTasksByQuadrant();
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.taskService.updateTasks(this.quadrants);
  }

  resetMatrix() {
    this.taskService.resetMatrix();
    this.quadrants = this.taskService.getTasksByQuadrant(); // Refresh the quadrants after reset
  }

  ngOnDestroy() {
    this.matrixTasksSubscription?.unsubscribe();
  }
}
