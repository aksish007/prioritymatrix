import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputTaskComponent } from './input-task/input-task.component';
import { MatrixComponent } from './matrix/matrix.component';
import { AngularSplitModule } from 'angular-split';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularSplitModule, InputTaskComponent, MatrixComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'priority-matrix';
}
