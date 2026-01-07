import {Component, signal, computed, output, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CollectionMetadata, uuid} from '../flashcards-metadata';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormArray} from '@angular/forms';
import {AssetUrlService} from '../../services/asset-url.service';
import {Button, ButtonSize} from '../../components/button/button';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {CollectionsService, SortBy} from '../services/collections.service';
import {StarButtonComponent} from '../../components/star-button/star-button.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Button, TranslatePipe, StarButtonComponent],
  host: {
    '[style.--search-icon-url]': 'assetUrlService.getSearchIconUrl()',
    '(document:click)': 'onDocumentClick($event)',
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
  starredFirst = signal(true); // Default to showing starred first
  editingCollectionId = signal<uuid | null>(null);
  expandedActionsId = signal<uuid | null>(null); // Track which card has expanded actions on mobile

  // Use service signals
  isLoading = this.collectionsService.isLoading;

  startStudyingCollection = output<uuid[]>();

  filteredCollections = computed(() => {
    const query = this.searchQuery();
    const searchResults = this.collectionsService.searchCollections(query);

    return this.collectionsService.sortCollections(
      searchResults,
      this.sortBy(),
      this.sortOrder(),
      this.starredFirst()
    );
  });

  // Calculate the global maximum maxBackLength across all collections
  globalMaxBackLength = computed(() => {
    const collections = this.collectionsService.collectionsMetadata();
    if (collections.length === 0) return 0;
    return Math.max(...collections.map(c => c.statistics.maxBackLength));
  });

  collectionForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(20)]],
    description: ['', [Validators.maxLength(200)]],
    labels: this.fb.array([this.fb.control('', [Validators.maxLength(50)])]),
  });

  ngOnInit(): void {
    // Recalculate due cards when the collections page is opened
    this.collectionsService.recalculateAllDueCards();
  }

  get labelsArray(): FormArray {
    return this.collectionForm.get('labels') as FormArray;
  }

  addLabelField(): void {
    this.labelsArray.push(this.fb.control('', [Validators.maxLength(50)]));
  }

  removeLabelField(index: number): void {
    if (this.labelsArray.length > 1) {
      this.labelsArray.removeAt(index);
    }
  }

  canAddLabel(): boolean {
    // Can add a new label field if all current fields are filled in
    return this.labelsArray.controls.every(control => control.value?.trim() !== '');
  }

  getLabelColor(index: number): string {
    const colors = [
      '#007bff', // Blue
      '#28a745', // Green
      '#dc3545', // Red
      '#ffc107', // Yellow/Orange
      '#17a2b8', // Cyan
      '#6610f2', // Purple
      '#e83e8c', // Pink
      '#fd7e14', // Orange
      '#20c997', // Teal
      '#6f42c1', // Indigo
    ];
    return colors[index % colors.length];
  }

  getLengthDistributionEntries(distribution: Record<string, number>) {
    return Object.entries(distribution)
      .map(([length, count]) => ({
        length: parseInt(length),
        count,
      }))
      .sort((a, b) => a.length - b.length);
  }

  getDistributionItemColorClass(length: number): string {
    // Use the global maximum maxBackLength across all collections
    const maxLength = this.globalMaxBackLength();

    if (maxLength === 0) return '';

    // Calculate the thresholds for color ranges
    const thirdRange = maxLength / 3;

    if (length <= thirdRange) {
      return 'distribution-green';
    } else if (length <= thirdRange * 2) {
      return 'distribution-yellow';
    } else {
      return 'distribution-red';
    }
  }

  toggleSelection(arrayNumber: uuid): void {
    if (this.isSelected(arrayNumber)) {
      this.selectedCollectionNumbers.update(numbers => numbers.filter(number => number !== arrayNumber));
      // Close expanded actions when deselecting
      if (this.expandedActionsId() === arrayNumber) {
        this.expandedActionsId.set(null);
      }
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
    // Reset labels array to have just one empty field
    this.labelsArray.clear();
    this.labelsArray.push(this.fb.control('', [Validators.maxLength(50)]));
    this.editingCollectionId.set(null);
  }

  addCollection() {
    if (this.collectionForm.valid) {
      const formValue = this.collectionForm.getRawValue();
      const editingId = this.editingCollectionId();

      // Filter out empty labels and handle null values
      const labels = (formValue.labels || [])
        .filter((label): label is string => label !== null && label.trim() !== '');

      if (editingId) {
        // Update existing collection
        this.collectionsService.updateCollection(editingId, {
          name: formValue.name || 'Untitled Collection',
          description: formValue.description || '',
          labels: labels,
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
          starred: true,
          labels: labels,
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
      description: collection.description,
    });

    // Clear and rebuild the labels array
    this.labelsArray.clear();
    if (collection.labels && collection.labels.length > 0) {
      collection.labels.forEach(label => {
        this.labelsArray.push(this.fb.control(label, [Validators.maxLength(50)]));
      });
    } else {
      // At least one empty field
      this.labelsArray.push(this.fb.control('', [Validators.maxLength(50)]));
    }

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

  toggleStarred(collection: CollectionMetadata): void {
    this.collectionsService.updateCollection(collection.id, {
      starred: !collection.starred
    });
  }

  toggleExpandedActions(collectionId: uuid): void {
    // Button already handles stopPropagation in its handleClick method
    if (this.expandedActionsId() === collectionId) {
      this.expandedActionsId.set(null);
    } else {
      this.expandedActionsId.set(collectionId);
    }
  }

  isActionsExpanded(collectionId: uuid): boolean {
    return this.expandedActionsId() === collectionId;
  }

  onDocumentClick(event: Event): void {
    // Close expanded menu when clicking outside
    // The stopPropagation in button clicks prevents this from firing when clicking the buttons
    const target = event.target as HTMLElement;
    if (!target.closest('.header-right')) {
      this.expandedActionsId.set(null);
    }
  }
}
