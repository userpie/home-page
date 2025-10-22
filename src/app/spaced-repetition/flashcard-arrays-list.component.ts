import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { flashcardArraysMetadata, FlashcardArrayMetadata } from './flashcard-metadata';

@Component({
  selector: 'app-flashcard-arrays-list',
  template: `
    <div class="flashcard-arrays-container">
      <div class="header-section">
        <h2>Flashcard Arrays</h2>
        <p class="subtitle">Overview of all available flashcard collections</p>
      </div>
      <div class="arrays-list">
        @for (array of flashcardArrays(); track array.arrayNumber) {
        <div class="array-card">
          <div class="array-header">
            <h3>Array {{ array.arrayNumber }}</h3>
            <span class="total-cards">{{ array.totalCards }} cards</span>
          </div>

          <div class="array-details">
            <p class="description">{{ array.description }}</p>

            <div class="statistics">
              <div class="stat-item">
                <span class="label">Average length:</span>
                <span class="value">{{ array.statistics.averageBackLength }}</span>
              </div>
              <div class="stat-item">
                <span class="label">Range:</span>
                <span class="value"
                  >{{ array.statistics.minBackLength }} - {{ array.statistics.maxBackLength }}</span
                >
              </div>
            </div>

            <div class="length-distribution">
              <h4>Length Distribution:</h4>
              <div class="distribution-items">
                @for (item of getLengthDistributionEntries(array.lengthDistribution); track
                item.length) {
                <span class="distribution-item"> {{ item.length }}ch: {{ item.count }} </span>
                }
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  `,
  styleUrls: ['./flashcard-arrays-list.component.scss'],
  imports: [CommonModule],
})
export class FlashcardArraysListComponent {
  flashcardArrays = signal<FlashcardArrayMetadata[]>(flashcardArraysMetadata);

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
}
