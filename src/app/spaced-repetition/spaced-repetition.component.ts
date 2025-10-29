import {Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {CollectionMetadata} from './collections-metadata';
import {CollectionsComponent} from './collections/collections.component';
import {StudyView} from './study-view/study-view';
import {LanguageSwitcherComponent} from '../components/language-selector/language-switcher.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-spaced-repetition',
  templateUrl: './spaced-repetition.component.html',
  styleUrls: ['./spaced-repetition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, CollectionsComponent, StudyView, LanguageSwitcherComponent, TranslatePipe],
})
export class SpacedRepetitionComponent {
  currentView = signal<'flashcards' | 'collections'>('collections');
  selectedFlashcards = signal<CollectionMetadata[]>([]);

  private platformId = inject(PLATFORM_ID);
  protected isBrowser = isPlatformBrowser(this.platformId);

  onArraySelected(selectedArray: CollectionMetadata[]): void {
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
