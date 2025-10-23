import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashcardArrayMetadata } from './flashcard-metadata';
import { FlashcardArraysListComponent } from './selection-view/selection-view.component';
import { StudyView } from './study-view/study-view';

@Component({
  selector: 'app-spaced-repetition',
  templateUrl: './spaced-repetition.component.html',
  styleUrls: ['./spaced-repetition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, FlashcardArraysListComponent, StudyView],
})
export class SpacedRepetitionComponent {
  currentView = signal<'study' | 'arraysList'>('arraysList');
  selectedFlashcards = signal<FlashcardArrayMetadata>(null as any);

  onArraySelected(selectedArray: FlashcardArrayMetadata): void {
    console.log('Array selected in parent component:', selectedArray);
    // Update the selected flashcards array
    this.selectedFlashcards.set(selectedArray);

    // Load the new cards and switch to study view
    this.currentView.set('study');
  }

  toggleToArraysList(): void {
    this.currentView.set('arraysList');
  }

  toggleToStudyView(): void {
    this.currentView.set('study');
  }
}
