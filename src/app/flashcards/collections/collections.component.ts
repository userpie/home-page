import {Component, signal, computed, output, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollectionMetadata, uuid} from '../flashcards-metadata';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AssetUrlService} from '../../services/asset-url.service';
import {Button, ButtonSize} from '../../components/button/button';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CollectionsService, SortBy} from '../services/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Button, TranslatePipe],
  host: {
    '[style.--search-icon-url]': 'assetUrlService.getSearchIconUrl()',
  }
})
export class CollectionsComponent implements OnInit {
  protected readonly ButtonSize = ButtonSize;

  private fb = inject(FormBuilder);
  protected assetUrlService = inject(AssetUrlService);
  private translate = inject(TranslateService);
  private collectionsService = inject(CollectionsService);

  selectedCollectionNumbers = signal<uuid[]>([]);
  showAddForm = signal(false);
  showResetModal = signal(false);
  searchQuery = signal('');
  sortBy = signal<SortBy>('dueCards');
  sortOrder = signal<'asc' | 'desc'>('asc');
  editingCollectionId = signal<uuid | null>(null);

  // Use service signals
  isLoading = this.collectionsService.isLoading;

  startStudyingCollection = output<uuid[]>();

  filteredCollections = computed(() => {
    const query = this.searchQuery();
    const searchResults = this.collectionsService.searchCollections(query);

    return this.collectionsService.sortCollections(
      searchResults,
      this.sortBy(),
      this.sortOrder()
    );
  });

  collectionForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.maxLength(200)]],
  });

  ngOnInit(): void {
    // Recalculate due cards when the collections page is opened
    this.collectionsService.recalculateAllDueCards();
  }

  getLengthDistributionEntries(distribution: Record<string, number>) {
    return Object.entries(distribution)
      .map(([length, count]) => ({
        length: parseInt(length),
        count,
      }))
      .sort((a, b) => a.length - b.length);
  }

  toggleSelection(arrayNumber: uuid): void {
    if (this.isSelected(arrayNumber)) {
      this.selectedCollectionNumbers.update(numbers => numbers.filter(number => number !== arrayNumber));
    } else {
      this.selectedCollectionNumbers.update(numbers => [...numbers, arrayNumber]);
    }
  }

  startStudying(array: CollectionMetadata): void {
    // Emit the selected array ID to switch to study mode
    this.startStudyingCollection.emit([array.id]);
  }

  isSelected(arrayNumber: uuid): boolean {
    return this.selectedCollectionNumbers().includes(arrayNumber);
  }

  cancelAddCollection(): void {
    this.showAddForm.set(false);
    this.collectionForm.reset();
    this.editingCollectionId.set(null);
  }

  addCollection() {
    if (this.collectionForm.valid) {
      const formValue = this.collectionForm.getRawValue();
      const editingId = this.editingCollectionId();

      if (editingId) {
        // Update existing collection
        this.collectionsService.updateCollection(editingId, {
          name: formValue.name || 'Untitled Collection',
          description: formValue.description || ''
        });
      } else {
        // Create new collection
        this.collectionsService.addCollection({
          name: formValue.name || 'Untitled Collection',
          description: formValue.description || '',
          totalCards: 0,
          lengthDistribution: {},
          statistics: {
            averageBackLength: 0,
            minBackLength: 0,
            maxBackLength: 0,
          },
        });
      }

      this.cancelAddCollection();
    }
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  onSortByChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortBy.set(target.value as SortBy);
  }

  onSortChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortOrder.set(target.value as 'asc' | 'desc');
  }

  editCollection(collection: CollectionMetadata): void {
    // Pre-fill the form with the selected collection's data
    this.collectionForm.patchValue({
      name: collection.name,
      description: collection.description
    });

    // Store the collection being edited
    this.editingCollectionId.set(collection.id);
    this.showAddForm.set(true);
  }

  deleteCollection(collection: CollectionMetadata): void {
    if (confirm(this.translate.instant('flashcards.delete-modal.message', {collectionName: collection.name}))) {
      // Delete the collection using the service
      this.collectionsService.deleteCollection(collection.id);

      // Clear selection if the deleted collection was selected
      if (this.selectedCollectionNumbers().includes(collection.id)) {
        this.selectedCollectionNumbers.update(numbers => numbers.filter(number => number !== collection.id));
      }
    }
  }

  openResetModal(): void {
    this.showResetModal.set(true);
  }

  hideResetModal(): void {
    this.showResetModal.set(false);
  }

  resetToDefaults(): void {
    // Reset state
    this.selectedCollectionNumbers.set([]);
    this.hideResetModal();

    // Use service to reset to defaults
    this.collectionsService.resetToDefaults();
  }

  protected startStudyingSelectedCollections() {
    this.startStudyingCollection.emit(this.selectedCollectionNumbers());
  }

  protected getDueCards(collectionMetadata: CollectionMetadata): number {
    // Use the pre-calculated dueCards value from the metadata
    // If not available, fall back to totalCards
    return collectionMetadata.dueCards ?? collectionMetadata.totalCards;
  }
}
