import {Component, input, output, computed} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingHistoryEntry} from '../services/collections.service';
import {Rating, State} from 'ts-fsrs';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-rating-history',
  templateUrl: './rating-history.component.html',
  styleUrl: './rating-history.component.scss',
  imports: [CommonModule, TranslatePipe],
})
export class RatingHistoryComponent {
  ratingHistory = input.required<RatingHistoryEntry[]>();
  close = output<void>();

  // Sort history by timestamp (newest first)
  sortedHistory = computed(() => {
    return [...this.ratingHistory()].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  });

  getRatingLabel(rating: Rating): string {
    switch (rating) {
      case Rating.Again:
        return 'Again';
      case Rating.Hard:
        return 'Hard';
      case Rating.Good:
        return 'Good';
      case Rating.Easy:
        return 'Easy';
      default:
        return 'Unknown';
    }
  }

  getRatingClass(rating: Rating): string {
    switch (rating) {
      case Rating.Again:
        return 'rating-again';
      case Rating.Hard:
        return 'rating-hard';
      case Rating.Good:
        return 'rating-good';
      case Rating.Easy:
        return 'rating-easy';
      default:
        return '';
    }
  }

  getStateLabel(state: State): string {
    switch (state) {
      case State.New:
        return 'New';
      case State.Learning:
        return 'Learning';
      case State.Review:
        return 'Review';
      case State.Relearning:
        return 'Relearning';
      default:
        return 'Unknown';
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 30) {
      return `${diffDays}d ago`;
    } else {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths}mo ago`;
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
