import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private activeExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    // By providing a copy of the array, you are providing at least partial mutation safety
    // from additions/removals (however object properties are still vulnerable)
    return [...this.availableExercises];
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.activeExercise = selectedExercise;
    // Create a new object to avoid mutation issues
    this.exerciseChanged.next({...this.activeExercise});
  }

  completeExercise() {
    this.exercises.push({
      ...this.activeExercise,
      date: new Date,
      state: 'completed'
    });
    this.activeExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.activeExercise,
      duration: this.activeExercise.duration * (progress / 100),
      calories: this.activeExercise.calories * (progress / 100),
      date: new Date,
      state: 'canceled'
    });
    this.activeExercise = null;
    this.exerciseChanged.next(null);
  }

  getActiveExercise() {
    // Create a new object to avoid mutation issues
    return {...this.activeExercise};
  }
}
