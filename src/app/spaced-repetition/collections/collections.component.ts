import { Component, signal, output, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {CollectionMetadata, uuid} from '../collections-metadata';
import { environment } from '../../../environments/environment';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-flashcard-arrays-list',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class CollectionsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  collectionsMetadata = signal<CollectionMetadata[]>([]);
  selectedCollectionNumber = signal<uuid | null>(null);
  isLoading = signal(true);
  showAddForm = signal(false);

  collectionSelected = output<CollectionMetadata>();

  collectionForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
  });

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
    this.http.get<CollectionMetadata[]>(environment.firstPath + '/assets/collection-metadata.json').subscribe({
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

  selectArray(arrayNumber: uuid): void {
    this.selectedCollectionNumber.set(arrayNumber);
  }

  startStudying(event: Event, array: CollectionMetadata): void {
    // Prevent the card click event from being triggered
    event.stopPropagation();

    // Emit the selected array to switch to study mode
    this.collectionSelected.emit(array);
  }

  isSelected(arrayNumber: uuid): boolean {
    return this.selectedCollectionNumber() === arrayNumber;
  }

  cancelAddCollection(): void {
    this.showAddForm.set(false);
    this.collectionForm.reset();
  }

  addCollection() {
    if (this.collectionForm.valid) {
      const formValue = this.collectionForm.getRawValue();

      const newCollection: CollectionMetadata = {
        id: crypto.randomUUID(),
        name: formValue.name || 'Untitled Collection',
        description: formValue.description || '',
        totalCards: 0,
        lengthDistribution: {},
        statistics: {
          averageBackLength: 0,
          minBackLength: 0,
          maxBackLength: 0,
        },
        createdAt: new Date().toISOString(),
      };

      this.collectionsMetadata.update((cards) => [...cards, newCollection]);
      this.saveCollectionMetadata();
      this.cancelAddCollection();
    }
  }
}
