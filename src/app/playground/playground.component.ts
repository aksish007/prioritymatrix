import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { InputTaskComponent } from '../input-task/input-task.component';
import { MatrixComponent } from '../matrix/matrix.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    CommonModule,
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
}
