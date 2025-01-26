import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { InputTaskComponent } from '../input-task/input-task.component';
import { MatrixComponent } from '../matrix/matrix.component';

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [
    CommonModule,
    AngularSplitModule,
    InputTaskComponent,
    MatrixComponent
  ],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {}
