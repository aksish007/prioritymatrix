import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { InputTaskComponent } from '../input-task/input-task.component';
import { MatrixComponent } from '../matrix/matrix.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AngularSplitModule,
    InputTaskComponent,
    MatrixComponent,
    MatButtonToggleModule,
    MatIconModule
  ],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {
  mobileView: 'tasks' | 'matrix' = 'tasks';

  constructor(private taskService: TaskService) {}

  onViewChange(view: 'tasks' | 'matrix') {
    this.mobileView = view;
    if (view === 'matrix') {
      this.taskService.autoSortTasks();
    }
  }
}
