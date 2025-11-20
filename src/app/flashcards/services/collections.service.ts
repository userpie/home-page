import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { CollectionMetadata, uuid } from '../flashcards-metadata';
import { environment } from '../../../environments/environment';

export interface StudyCard {
  id: string;
  front: string;
  back: string;
  fsrsCard: any; // FSRS Card type
  isRevealed?: boolean;
  collection: uuid;
}

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  // Signals for reactive state management
  private readonly _collectionsMetadata = signal<CollectionMetadata[]>([]);
  private readonly _isLoading = signal(true);

  // Public readonly signals
  readonly collectionsMetadata = this._collectionsMetadata.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();

  // Computed values can be added here as needed

  constructor() {
    this.loadCollections();
  }

  /**
   * Load collections from localStorage or default data
   */
  loadCollections(): void {
    if (!this.isBrowser) {
      this._isLoading.set(false);
      return;
    }

    const savedData = localStorage.getItem('collection-metadata');
    if (savedData) {
      try {
        const collectionsMetadata = JSON.parse(savedData);
        this._collectionsMetadata.set(collectionsMetadata);
        this._isLoading.set(false);
      } catch (error) {
        console.error('Error loading collection metadata:', error);
        this.loadDefaultCollections();
      }
    } else {
      this.loadDefaultCollections();
    }
  }

  /**
   * Load default collections from JSON file
   */
  private loadDefaultCollections(): void {
    this.http.get<CollectionMetadata[]>(
      environment.firstPath + '/assets/spaced-repetition/collection-metadata.json'
    ).subscribe({
      next: (collectionsData) => {
        this._collectionsMetadata.set(collectionsData);
        this.saveToLocalStorage();
        this._isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading default collections:', error);
        this._isLoading.set(false);
      },
    });
  }

  /**
   * Save collections metadata to localStorage
   */
  private saveToLocalStorage(): void {
    if (!this.isBrowser) return;

    const metadata = this._collectionsMetadata();
    if (metadata.length > 0) {
      localStorage.setItem('collection-metadata', JSON.stringify(metadata));
    }
  }

  /**
   * Add a new collection
   */
  addCollection(collection: Omit<CollectionMetadata, 'id' | 'createdAt'>): CollectionMetadata {
    const newCollection: CollectionMetadata = {
      ...collection,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    this._collectionsMetadata.update(collections => [...collections, newCollection]);
    this.saveToLocalStorage();

    return newCollection;
  }

  /**
   * Update an existing collection
   */
  updateCollection(id: uuid, updates: Partial<CollectionMetadata>): boolean {
    const collections = this._collectionsMetadata();
    const index = collections.findIndex(c => c.id === id);

    if (index === -1) {
      return false;
    }

    this._collectionsMetadata.update(collections =>
      collections.map(collection =>
        collection.id === id ? { ...collection, ...updates } : collection
      )
    );

    this.saveToLocalStorage();
    return true;
  }

  /**
   * Delete a collection and its associated flashcard data
   */
  deleteCollection(id: uuid): boolean {
    const collections = this._collectionsMetadata();
    const collectionExists = collections.some(c => c.id === id);

    if (!collectionExists) {
      return false;
    }

    // Remove collection from metadata
    this._collectionsMetadata.update(collections =>
      collections.filter(c => c.id !== id)
    );

    // Remove associated flashcard data from localStorage
    if (this.isBrowser) {
      localStorage.removeItem(id);
    }

    this.saveToLocalStorage();
    return true;
  }

  /**
   * Get a collection by ID
   */
  getCollection(id: uuid): CollectionMetadata | undefined {
    return this._collectionsMetadata().find(c => c.id === id);
  }

  /**
   * Get multiple collections by IDs
   */
  getCollections(ids: uuid[]): CollectionMetadata[] {
    const collections = this._collectionsMetadata();
    return collections.filter(collection => ids.includes(collection.id));
  }

  /**
   * Update collection statistics when cards are modified
   */
  updateCollectionStats(collectionId: uuid, cards: StudyCard[]): void {
    const collectionCards = cards.filter(card => card.collection === collectionId);

    if (collectionCards.length === 0) {
      return;
    }

    // Calculate statistics
    const backLengths = collectionCards.map(card => card.back.length);
    const totalCards = collectionCards.length;
    const averageBackLength = backLengths.reduce((sum, length) => sum + length, 0) / totalCards;
    const minBackLength = Math.min(...backLengths);
    const maxBackLength = Math.max(...backLengths);

    // Calculate length distribution
    const lengthDistribution: Record<string, number> = {};
    backLengths.forEach(length => {
      const key = length.toString();
      lengthDistribution[key] = (lengthDistribution[key] || 0) + 1;
    });

    // Update collection metadata
    this.updateCollection(collectionId, {
      totalCards,
      lengthDistribution,
      statistics: {
        averageBackLength: Math.round(averageBackLength * 100) / 100,
        minBackLength,
        maxBackLength,
      },
    });
  }

  /**
   * Reset all collections to defaults
   */
  resetToDefaults(): void {
    if (!this.isBrowser) {
      return;
    }

    // Clear all collection metadata from localStorage
    localStorage.removeItem('collection-metadata');

    // Clear all individual collection flashcard data
    const currentCollections = this._collectionsMetadata();
    currentCollections.forEach(collection => {
      localStorage.removeItem(collection.id);
    });

    // Clear any other spaced repetition related data
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('flashcards-') || key.includes('collection'))) {
        localStorage.removeItem(key);
      }
    }

    // Reset state and load defaults
    this._collectionsMetadata.set([]);
    this.loadDefaultCollections();
  }

  /**
   * Search collections by name or description
   */
  searchCollections(query: string): CollectionMetadata[] {
    if (!query.trim()) {
      return this._collectionsMetadata();
    }

    const normalizedQuery = query.toLowerCase().trim();
    return this._collectionsMetadata().filter(collection =>
      collection.name.toLowerCase().includes(normalizedQuery) ||
      collection.description.toLowerCase().includes(normalizedQuery)
    );
  }

  /**
   * Sort collections by specified criteria
   */
  sortCollections(
    collections: CollectionMetadata[],
    sortBy: 'createdAt' | 'name' | 'totalCards',
    sortOrder: 'asc' | 'desc'
  ): CollectionMetadata[] {
    return [...collections].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'createdAt':
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          comparison = dateA - dateB;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'totalCards':
          comparison = a.totalCards - b.totalCards;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }
}
