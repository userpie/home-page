import { Component, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { flashcardArraysMetadata, FlashcardArrayMetadata } from '../flashcard-metadata';

@Component({
  selector: 'app-flashcard-arrays-list',
  templateUrl: './selection-view.component.html',
  styleUrls: ['./selection-view.component.scss'],
  imports: [CommonModule],
})
export class FlashcardArraysListComponent {
  flashcardArrays = signal<FlashcardArrayMetadata[]>(flashcardArraysMetadata);
  selectedArrayNumber = signal<number | null>(null);

  // Output to emit when an array is selected
  arraySelected = output<FlashcardArrayMetadata>();

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
