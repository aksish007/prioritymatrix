import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { InputTaskComponent } from '../input-task/input-task.component';
import { MatrixComponent } from '../matrix/matrix.component';
import { DeviceDetectorService } from 'ngx-device-detector';

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
export class PlaygroundComponent {
  isMobile: boolean = false;

  constructor(private deviceService: DeviceDetectorService){
    this.isMobile = this.deviceService.isMobile();
  }

}
