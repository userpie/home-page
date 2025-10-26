import {Component, ChangeDetectionStrategy, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CollectionMetadata} from './collections-metadata';
import {CollectionsComponent} from './collections/collections.component';
import {StudyView} from './study-view/study-view';
import {LanguageSwitcherComponent} from '../components/language-selector/language-switcher.component';

@Component({
  selector: 'app-spaced-repetition',
  templateUrl: './spaced-repetition.component.html',
  styleUrls: ['./spaced-repetition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, CollectionsComponent, StudyView, LanguageSwitcherComponent],
})
export class SpacedRepetitionComponent {
  currentView = signal<'flashcards' | 'collections'>('collections');
  selectedFlashcards = signal<CollectionMetadata>(null as any);

  onArraySelected(selectedArray: CollectionMetadata): void {
    this.selectedFlashcards.set(selectedArray);

    // Load the new cards and switch to study view
    this.currentView.set('flashcards');
  }

  toggleToCollections(): void {
    this.currentView.set('collections');
  }

  toggleToFlashcards(): void {
    this.currentView.set('flashcards');
  }
}
