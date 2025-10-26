import {Component, computed, inject, input, OnInit, PLATFORM_ID, signal} from '@angular/core';
import {CollectionMetadata} from '../collections-metadata';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Card, createEmptyCard, FSRS, Grade, Rating, State} from 'ts-fsrs';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

interface StudyCard {
  id: string;
  front: string;
  back: string;
  fsrsCard: Card;
  isRevealed: boolean;
}

@Component({
  selector: 'app-flashcards',
  templateUrl: './study-view.html',
  styleUrl: './study-view.scss',
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
})
export class StudyView implements OnInit {
  private fb = inject(FormBuilder);
  private fsrs = new FSRS({});

  isLoading = signal(true);
  allCards = signal<StudyCard[]>([]);
  currentCardIndex = signal(0);
  showAddForm = signal(false);

  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly http = inject(HttpClient);

  selectedFlashcards = input.required<CollectionMetadata>();

  // Form for adding new cards
  cardForm = this.fb.nonNullable.group({
    front: ['', [Validators.required]],
    back: ['', [Validators.required]],
  });

  // Computed values
  dueCards = computed(() => {
    if (this.isLoading()) return [];
    const now = new Date();

    return this.allCards().filter(
      (card) => card.fsrsCard.state === State.New || card.fsrsCard.due <= now
    );
  });

  currentCard = computed(() => {
    const due = this.dueCards();
    const index = this.currentCardIndex();
    return due[index] || null;
  });

  // Get scheduling preview for rating buttons
  getSchedulingPreview = computed(() => {
    const current = this.currentCard();
    if (!current) return null;

    const schedulingCards = this.fsrs.repeat(current.fsrsCard, new Date());

    return {
      again: schedulingCards[Rating.Again].card.due,
      hard: schedulingCards[Rating.Hard].card.due,
      good: schedulingCards[Rating.Good].card.due,
      easy: schedulingCards[Rating.Easy].card.due,
    };
  });

  ngOnInit(): void {
    this.loadCards();
  }

  revealCard(): void {
    const current = this.currentCard();
    if (current) {
      const updatedCards = this.allCards().map((card) =>
        card.id === current.id ? {...card, isRevealed: true} : card
      );
      this.allCards.set(updatedCards);
    }
  }

  rateCard(grade: Grade): void {
    const current = this.currentCard();
    if (!current) return;

    // Get the rating from FSRS
    const rating =
      grade === 1
        ? Rating.Again
        : grade === 2
          ? Rating.Hard
          : grade === 3
            ? Rating.Good
            : Rating.Easy;

    // Schedule the card with FSRS
    const schedulingCards = this.fsrs.repeat(current.fsrsCard, new Date());
    const updatedFsrsCard = schedulingCards[rating].card;

    // Update the card in our collection
    const updatedCards = this.allCards().map((card) =>
      card.id === current.id
        ? {
          ...card,
          fsrsCard: updatedFsrsCard,
          isRevealed: false,
        }
        : card
    );

    this.allCards.set(updatedCards);
    this.saveCards();

    // Move to next card or reset if no more due cards
    const newDueCards = this.dueCards();
    if (newDueCards.length === 0) {
      this.currentCardIndex.set(0);
    } else {
      const nextIndex = this.currentCardIndex();
      if (nextIndex >= newDueCards.length) {
        this.currentCardIndex.set(0);
      }
    }
  }

  addCard(): void {
    if (this.cardForm.valid) {
      const formValue = this.cardForm.getRawValue();

      const newCard: StudyCard = {
        id: crypto.randomUUID(),
        front: formValue.front,
        back: formValue.back,
        fsrsCard: createEmptyCard(),
        isRevealed: false,
      };

      this.allCards.update((cards) => [...cards, newCard]);
      this.saveCards();
      this.cancelAddCard();
    }
  }

  cancelAddCard(): void {
    this.showAddForm.set(false);
    this.cardForm.reset();
  }

  resetAllCards(): void {
    if (confirm(this.translate.instant('spaced-repetition.reset-cards-modal.message'))) {
      const resetCards = this.allCards().map((card) => ({
        ...card,
        fsrsCard: createEmptyCard(),
        isRevealed: false,
      }));
      this.allCards.set(resetCards);
      this.currentCardIndex.set(0);
      this.saveCards();
    }
  }

  // Format time until next review
  formatTimeUntil(date: Date): string {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${Math.max(1, diffMinutes)}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 30) {
      return `${diffDays}d`;
    } else {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths}mo`;
    }
  }

  // Get card statistics
  getCardStats(card: StudyCard): string {
    const fsrsCard = card.fsrsCard;
    if (fsrsCard.state === State.New) {
      return this.translate.instant('spaced-repetition.new-card');
    }

    const reviews = fsrsCard.reps;
    const lapses = fsrsCard.lapses;
    const difficulty = Math.round(fsrsCard.difficulty * 10) / 10;

    return `${reviews} ${this.translate.instant('spaced-repetition.reviews')}, ${lapses} ${this.translate.instant('spaced-repetition.lapses')}, ${this.translate.instant('spaced-repetition.difficulty')}: ${difficulty}`;
  }

  private saveCards(): void {
    if (!this.isBrowser) return;

    const cardsData = this.allCards().map((card) => ({
      id: card.id,
      front: card.front,
      back: card.back,
      fsrsCard: {
        due: card.fsrsCard.due.toISOString(),
        stability: card.fsrsCard.stability,
        difficulty: card.fsrsCard.difficulty,
        elapsed_days: card.fsrsCard.elapsed_days,
        scheduled_days: card.fsrsCard.scheduled_days,
        reps: card.fsrsCard.reps,
        lapses: card.fsrsCard.lapses,
        state: card.fsrsCard.state,
        last_review: card.fsrsCard.last_review?.toISOString(),
      },
    }));

    localStorage.setItem(this.selectedFlashcards().id, JSON.stringify(cardsData));
  }

  private loadCards(): void {
    if (!this.isBrowser) {
      return;
    }

    const savedData = localStorage.getItem(this.selectedFlashcards().id);
    if (savedData) {
      try {
        const cardsData = JSON.parse(savedData);
        const cards: StudyCard[] = cardsData.map((data: any) => ({
          id: data.id,
          front: data.front,
          back: data.back,
          isRevealed: false,
          fsrsCard: {
            ...data.fsrsCard,
            due: new Date(data.fsrsCard.due),
            last_review: data.fsrsCard.last_review
              ? new Date(data.fsrsCard.last_review)
              : undefined,
          },
        }));
        this.allCards.set(cards);
      } catch (error) {
        console.error('Error loading cards:', error);
        this.initializeSampleCards();
      }
    } else {
      this.initializeSampleCards();
    }

    setTimeout(() => {
      this.isLoading.set(false);
    }, 200);
  }

  private initializeSampleCards(): void {
    this.http.get<StudyCard[]>(environment.firstPath + this.selectedFlashcards().path).subscribe({
      next: (data) => {
        const cards: StudyCard[] = data.map((data: any) => ({
          id: crypto.randomUUID(),
          front: data.front,
          back: data.back,
          isRevealed: false,
          fsrsCard: {
            ...data.fsrsCard,
            due: new Date(data.fsrsCard.due),
            last_review: data.fsrsCard.last_review
              ? new Date(data.fsrsCard.last_review)
              : undefined,
          },
        }));
        this.allCards.set(cards);
        this.saveCards();
      },
      error: (error) => {
        console.error('Error loading flashcards:', error);
      },
    });
  }
}
