import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer: NodeJS.Timer;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  // Progress is saved in the timer so this will pick up at that stored value
  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {progress: this.progress};

    const dialogRef = this.dialog.open(StopTrainingComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }

}
