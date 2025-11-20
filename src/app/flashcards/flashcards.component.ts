import {Component, ChangeDetectionStrategy, signal, inject, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {uuid} from './flashcards-metadata';
import {CollectionsComponent} from './collections/collections.component';
import {SelectionView} from './selection/selection-view.component';
import {LanguageSwitcherComponent} from '../components/language-selector/language-switcher.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, CollectionsComponent, SelectionView, LanguageSwitcherComponent, TranslatePipe],
})
export class FlashcardsComponent {
  currentView = signal<'flashcards' | 'collections'>('collections');
  selectedFlashcards = signal<uuid[]>([]);

  private platformId = inject(PLATFORM_ID);
  protected isBrowser = isPlatformBrowser(this.platformId);

  onArraySelected(selectedArray: uuid[]): void {
    this.selectedFlashcards.set(selectedArray);

    // Load the new cards and switch to study view
    this.currentView.set('flashcards');
  }

  toggleToCollections(): void {
    this.currentView.set('collections');
  }
}
