import { Component, signal, output, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FlashcardArrayMetadata } from '../flashcard-metadata';

@Component({
  selector: 'app-flashcard-arrays-list',
  templateUrl: './selection-view.component.html',
  styleUrls: ['./selection-view.component.scss'],
  imports: [CommonModule],
})
export class FlashcardArraysListComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  flashcardArrays = signal<FlashcardArrayMetadata[]>([]);
  selectedArrayNumber = signal<number | null>(null);
  isLoading = signal(true);

  arraySelected = output<FlashcardArrayMetadata>();

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections() {
    if (!this.isBrowser) {
      return;
    }

    const savedData = localStorage.getItem('collection-metadata');
    if (savedData) {
      try {
        const cardsData = JSON.parse(savedData);
        this.flashcardArrays.set(cardsData);
      } catch (error) {
        console.error('Error loading cards:', error);
        this.loadDefaultCollection();
      }
    } else {
      this.loadDefaultCollection();
    }

    this.isLoading.set(false);
  }

  loadDefaultCollection(): void {
    this.http.get<FlashcardArrayMetadata[]>('/assets/collection-metadata.json').subscribe({
      next: (cardsData) => {
        this.flashcardArrays.set(cardsData);
        this.saveCollectionMetadata();
      },
      error: (error) => {
        console.error('Error loading flashcards:', error);
      },
    });
  }

  saveCollectionMetadata() {
    if (this.flashcardArrays()) {
      localStorage.setItem('collection-metadata', JSON.stringify(this.flashcardArrays()));
    }
  }

  getLengthDistributionEntries(distribution: Record<string, number>) {
    return Object.entries(distribution)
      .map(([length, count]) => ({
        length: parseInt(length),
        count,
      }))
      .sort((a, b) => a.length - b.length);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }

  selectArray(arrayNumber: number): void {
    this.selectedArrayNumber.set(arrayNumber);
  }

  startStudying(event: Event, array: FlashcardArrayMetadata): void {
    // Prevent the card click event from being triggered
    event.stopPropagation();

    // Emit the selected array to switch to study mode
    this.arraySelected.emit(array);
  }

  isSelected(arrayNumber: number): boolean {
    return this.selectedArrayNumber() === arrayNumber;
  }
}
