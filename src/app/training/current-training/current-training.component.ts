import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: NodeJS.Timer;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  // Progress is saved in the timer so this will pick up at that stored value
  startOrResumeTimer() {
    // This converts the duration to a base of 100 units (solve: 1/duration = x/100 => x = duration/100)
    const step = this.trainingService.getActiveExercise().duration / 100 * 1000;
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        // Since reached 100, exercise is complete, which triggers page to revert to new training view
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }

  onStop() {
    clearInterval(this.timer);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {progress: this.progress};

    const dialogRef = this.dialog.open(StopTrainingComponent, dialogConfig);

    // The result here is a boolean emitted by the dialogue box indicating if it was canceled or not
    dialogRef.afterClosed().subscribe(userCanceled => {
      if (userCanceled) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
