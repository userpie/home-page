import { Component, signal, output, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CollectionMetadata } from '../collections-metadata';

@Component({
  selector: 'app-flashcard-arrays-list',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  imports: [CommonModule],
})
export class CollectionsComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  collectionsMetadata = signal<CollectionMetadata[]>([]);
  selectedCollectionNumber = signal<number | null>(null);
  isLoading = signal(true);

  collectionSelected = output<CollectionMetadata>();

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
        const collectionsMetadata = JSON.parse(savedData);
        this.collectionsMetadata.set(collectionsMetadata);
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
    this.http.get<CollectionMetadata[]>('/assets/collection-metadata.json').subscribe({
      next: (cardsData) => {
        this.collectionsMetadata.set(cardsData);
        this.saveCollectionMetadata();
      },
      error: (error) => {
        console.error('Error loading flashcards:', error);
      },
    });
  }

  saveCollectionMetadata() {
    if (this.collectionsMetadata()) {
      localStorage.setItem('collection-metadata', JSON.stringify(this.collectionsMetadata()));
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
    this.selectedCollectionNumber.set(arrayNumber);
  }

  startStudying(event: Event, array: CollectionMetadata): void {
    // Prevent the card click event from being triggered
    event.stopPropagation();

    // Emit the selected array to switch to study mode
    this.collectionSelected.emit(array);
  }

  isSelected(arrayNumber: number): boolean {
    return this.selectedCollectionNumber() === arrayNumber;
  }
}
