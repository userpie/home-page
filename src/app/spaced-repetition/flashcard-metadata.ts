export interface FlashcardArrayMetadata {
  path: string;
  filename: string;
  arrayNumber: number;
  localStorageKey: string;
  totalCards: number;
  lengthDistribution: Record<string, number>;
  statistics: {
    averageBackLength: number;
    minBackLength: number;
    maxBackLength: number;
  };
  createdAt: string;
  description: string;
}

export const flashcardArraysMetadata: FlashcardArrayMetadata[] = [
  {
    path: "/assets/flashcards-array-01.json",
    filename: "flashcards-array-01.json",
    arrayNumber: 1,
    localStorageKey: "spaced-repetition-cards-array-1",
    totalCards: 20,
    lengthDistribution: {
      "1": 1,
      "2": 17,
      "3": 2,
    },
    statistics: {
      averageBackLength: 2.05,
      minBackLength: 1,
      maxBackLength: 3,
    },
    createdAt: "2025-10-22T20:25:33.749Z",
    description:
      "Flashcards array 1 containing 20 cards with back field lengths ranging from 1 to 3 characters",
  },
  {
    path: "/assets/flashcards-array-02.json",
    filename: "flashcards-array-02.json",
    arrayNumber: 2,
    localStorageKey: "spaced-repetition-cards-array-2",
    totalCards: 20,
    lengthDistribution: {
      "3": 20,
    },
    statistics: {
      averageBackLength: 3,
      minBackLength: 3,
      maxBackLength: 3,
    },
    createdAt: "2025-10-22T20:25:33.750Z",
    description:
      "Flashcards array 2 containing 20 cards with back field lengths ranging from 3 to 3 characters",
  },
  {
    path: "/assets/flashcards-array-03.json",
    filename: "flashcards-array-03.json",
    arrayNumber: 3,
    localStorageKey: "spaced-repetition-cards-array-3",
    totalCards: 20,
    lengthDistribution: {
      "3": 20,
    },
    statistics: {
      averageBackLength: 3,
      minBackLength: 3,
      maxBackLength: 3,
    },
    createdAt: "2025-10-22T20:25:33.750Z",
    description:
      "Flashcards array 3 containing 20 cards with back field lengths ranging from 3 to 3 characters",
  },
  {
    path: "/assets/flashcards-array-04.json",
    filename: "flashcards-array-04.json",
    arrayNumber: 4,
    localStorageKey: "spaced-repetition-cards-array-4",
    totalCards: 20,
    lengthDistribution: {
      "3": 20,
    },
    statistics: {
      averageBackLength: 3,
      minBackLength: 3,
      maxBackLength: 3,
    },
    createdAt: "2025-10-22T20:25:33.751Z",
    description:
      "Flashcards array 4 containing 20 cards with back field lengths ranging from 3 to 3 characters",
  },
  {
    path: "/assets/flashcards-array-05.json",
    filename: "flashcards-array-05.json",
    arrayNumber: 5,
    localStorageKey: "spaced-repetition-cards-array-5",
    totalCards: 20,
    lengthDistribution: {
      "3": 20,
    },
    statistics: {
      averageBackLength: 3,
      minBackLength: 3,
      maxBackLength: 3,
    },
    createdAt: "2025-10-22T20:25:33.751Z",
    description:
      "Flashcards array 5 containing 20 cards with back field lengths ranging from 3 to 3 characters",
  },
  {
    path: "/assets/flashcards-array-06.json",
    filename: "flashcards-array-06.json",
    arrayNumber: 6,
    localStorageKey: "spaced-repetition-cards-array-6",
    totalCards: 20,
    lengthDistribution: {
      "3": 20,
    },
    statistics: {
      averageBackLength: 3,
      minBackLength: 3,
      maxBackLength: 3,
    },
    createdAt: "2025-10-22T20:25:33.751Z",
    description:
      "Flashcards array 6 containing 20 cards with back field lengths ranging from 3 to 3 characters",
  },
  {
    path: "/assets/flashcards-array-07.json",
    filename: "flashcards-array-07.json",
    arrayNumber: 7,
    localStorageKey: "spaced-repetition-cards-array-7",
    totalCards: 20,
    lengthDistribution: {
      "3": 4,
      "4": 16,
    },
    statistics: {
      averageBackLength: 3.8,
      minBackLength: 3,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.751Z",
    description:
      "Flashcards array 7 containing 20 cards with back field lengths ranging from 3 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-08.json",
    filename: "flashcards-array-08.json",
    arrayNumber: 8,
    localStorageKey: "spaced-repetition-cards-array-8",
    totalCards: 20,
    lengthDistribution: {
      "4": 20,
    },
    statistics: {
      averageBackLength: 4,
      minBackLength: 4,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.752Z",
    description:
      "Flashcards array 8 containing 20 cards with back field lengths ranging from 4 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-09.json",
    filename: "flashcards-array-09.json",
    arrayNumber: 9,
    localStorageKey: "spaced-repetition-cards-array-9",
    totalCards: 20,
    lengthDistribution: {
      "4": 20,
    },
    statistics: {
      averageBackLength: 4,
      minBackLength: 4,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.752Z",
    description:
      "Flashcards array 9 containing 20 cards with back field lengths ranging from 4 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-10.json",
    filename: "flashcards-array-10.json",
    arrayNumber: 10,
    localStorageKey: "spaced-repetition-cards-array-10",
    totalCards: 20,
    lengthDistribution: {
      "4": 20,
    },
    statistics: {
      averageBackLength: 4,
      minBackLength: 4,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.752Z",
    description:
      "Flashcards array 10 containing 20 cards with back field lengths ranging from 4 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-11.json",
    filename: "flashcards-array-11.json",
    arrayNumber: 11,
    localStorageKey: "spaced-repetition-cards-array-11",
    totalCards: 20,
    lengthDistribution: {
      "4": 20,
    },
    statistics: {
      averageBackLength: 4,
      minBackLength: 4,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.752Z",
    description:
      "Flashcards array 11 containing 20 cards with back field lengths ranging from 4 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-12.json",
    filename: "flashcards-array-12.json",
    arrayNumber: 12,
    localStorageKey: "spaced-repetition-cards-array-12",
    totalCards: 20,
    lengthDistribution: {
      "4": 20,
    },
    statistics: {
      averageBackLength: 4,
      minBackLength: 4,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.753Z",
    description:
      "Flashcards array 12 containing 20 cards with back field lengths ranging from 4 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-13.json",
    filename: "flashcards-array-13.json",
    arrayNumber: 13,
    localStorageKey: "spaced-repetition-cards-array-13",
    totalCards: 20,
    lengthDistribution: {
      "4": 20,
    },
    statistics: {
      averageBackLength: 4,
      minBackLength: 4,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.753Z",
    description:
      "Flashcards array 13 containing 20 cards with back field lengths ranging from 4 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-14.json",
    filename: "flashcards-array-14.json",
    arrayNumber: 14,
    localStorageKey: "spaced-repetition-cards-array-14",
    totalCards: 20,
    lengthDistribution: {
      "4": 20,
    },
    statistics: {
      averageBackLength: 4,
      minBackLength: 4,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.754Z",
    description:
      "Flashcards array 14 containing 20 cards with back field lengths ranging from 4 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-15.json",
    filename: "flashcards-array-15.json",
    arrayNumber: 15,
    localStorageKey: "spaced-repetition-cards-array-15",
    totalCards: 20,
    lengthDistribution: {
      "4": 20,
    },
    statistics: {
      averageBackLength: 4,
      minBackLength: 4,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.754Z",
    description:
      "Flashcards array 15 containing 20 cards with back field lengths ranging from 4 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-16.json",
    filename: "flashcards-array-16.json",
    arrayNumber: 16,
    localStorageKey: "spaced-repetition-cards-array-16",
    totalCards: 20,
    lengthDistribution: {
      "4": 20,
    },
    statistics: {
      averageBackLength: 4,
      minBackLength: 4,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.755Z",
    description:
      "Flashcards array 16 containing 20 cards with back field lengths ranging from 4 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-17.json",
    filename: "flashcards-array-17.json",
    arrayNumber: 17,
    localStorageKey: "spaced-repetition-cards-array-17",
    totalCards: 20,
    lengthDistribution: {
      "4": 20,
    },
    statistics: {
      averageBackLength: 4,
      minBackLength: 4,
      maxBackLength: 4,
    },
    createdAt: "2025-10-22T20:25:33.755Z",
    description:
      "Flashcards array 17 containing 20 cards with back field lengths ranging from 4 to 4 characters",
  },
  {
    path: "/assets/flashcards-array-18.json",
    filename: "flashcards-array-18.json",
    arrayNumber: 18,
    localStorageKey: "spaced-repetition-cards-array-18",
    totalCards: 20,
    lengthDistribution: {
      "4": 17,
      "5": 3,
    },
    statistics: {
      averageBackLength: 4.15,
      minBackLength: 4,
      maxBackLength: 5,
    },
    createdAt: "2025-10-22T20:25:33.755Z",
    description:
      "Flashcards array 18 containing 20 cards with back field lengths ranging from 4 to 5 characters",
  },
  {
    path: "/assets/flashcards-array-19.json",
    filename: "flashcards-array-19.json",
    arrayNumber: 19,
    localStorageKey: "spaced-repetition-cards-array-19",
    totalCards: 20,
    lengthDistribution: {
      "5": 20,
    },
    statistics: {
      averageBackLength: 5,
      minBackLength: 5,
      maxBackLength: 5,
    },
    createdAt: "2025-10-22T20:25:33.755Z",
    description:
      "Flashcards array 19 containing 20 cards with back field lengths ranging from 5 to 5 characters",
  },
  {
    path: "/assets/flashcards-array-20.json",
    filename: "flashcards-array-20.json",
    arrayNumber: 20,
    localStorageKey: "spaced-repetition-cards-array-20",
    totalCards: 20,
    lengthDistribution: {
      "5": 20,
    },
    statistics: {
      averageBackLength: 5,
      minBackLength: 5,
      maxBackLength: 5,
    },
    createdAt: "2025-10-22T20:25:33.755Z",
    description:
      "Flashcards array 20 containing 20 cards with back field lengths ranging from 5 to 5 characters",
  },
  {
    path: "/assets/flashcards-array-21.json",
    filename: "flashcards-array-21.json",
    arrayNumber: 21,
    localStorageKey: "spaced-repetition-cards-array-21",
    totalCards: 20,
    lengthDistribution: {
      "5": 20,
    },
    statistics: {
      averageBackLength: 5,
      minBackLength: 5,
      maxBackLength: 5,
    },
    createdAt: "2025-10-22T20:25:33.756Z",
    description:
      "Flashcards array 21 containing 20 cards with back field lengths ranging from 5 to 5 characters",
  },
  {
    path: "/assets/flashcards-array-22.json",
    filename: "flashcards-array-22.json",
    arrayNumber: 22,
    localStorageKey: "spaced-repetition-cards-array-22",
    totalCards: 20,
    lengthDistribution: {
      "5": 20,
    },
    statistics: {
      averageBackLength: 5,
      minBackLength: 5,
      maxBackLength: 5,
    },
    createdAt: "2025-10-22T20:25:33.756Z",
    description:
      "Flashcards array 22 containing 20 cards with back field lengths ranging from 5 to 5 characters",
  },
  {
    path: "/assets/flashcards-array-23.json",
    filename: "flashcards-array-23.json",
    arrayNumber: 23,
    localStorageKey: "spaced-repetition-cards-array-23",
    totalCards: 20,
    lengthDistribution: {
      "5": 20,
    },
    statistics: {
      averageBackLength: 5,
      minBackLength: 5,
      maxBackLength: 5,
    },
    createdAt: "2025-10-22T20:25:33.757Z",
    description:
      "Flashcards array 23 containing 20 cards with back field lengths ranging from 5 to 5 characters",
  },
  {
    path: "/assets/flashcards-array-24.json",
    filename: "flashcards-array-24.json",
    arrayNumber: 24,
    localStorageKey: "spaced-repetition-cards-array-24",
    totalCards: 20,
    lengthDistribution: {
      "5": 20,
    },
    statistics: {
      averageBackLength: 5,
      minBackLength: 5,
      maxBackLength: 5,
    },
    createdAt: "2025-10-22T20:25:33.757Z",
    description:
      "Flashcards array 24 containing 20 cards with back field lengths ranging from 5 to 5 characters",
  },
  {
    path: "/assets/flashcards-array-25.json",
    filename: "flashcards-array-25.json",
    arrayNumber: 25,
    localStorageKey: "spaced-repetition-cards-array-25",
    totalCards: 20,
    lengthDistribution: {
      "5": 20,
    },
    statistics: {
      averageBackLength: 5,
      minBackLength: 5,
      maxBackLength: 5,
    },
    createdAt: "2025-10-22T20:25:33.757Z",
    description:
      "Flashcards array 25 containing 20 cards with back field lengths ranging from 5 to 5 characters",
  },
  {
    path: "/assets/flashcards-array-26.json",
    filename: "flashcards-array-26.json",
    arrayNumber: 26,
    localStorageKey: "spaced-repetition-cards-array-26",
    totalCards: 20,
    lengthDistribution: {
      "5": 20,
    },
    statistics: {
      averageBackLength: 5,
      minBackLength: 5,
      maxBackLength: 5,
    },
    createdAt: "2025-10-22T20:25:33.758Z",
    description:
      "Flashcards array 26 containing 20 cards with back field lengths ranging from 5 to 5 characters",
  },
  {
    path: "/assets/flashcards-array-27.json",
    filename: "flashcards-array-27.json",
    arrayNumber: 27,
    localStorageKey: "spaced-repetition-cards-array-27",
    totalCards: 20,
    lengthDistribution: {
      "5": 14,
      "6": 6,
    },
    statistics: {
      averageBackLength: 5.3,
      minBackLength: 5,
      maxBackLength: 6,
    },
    createdAt: "2025-10-22T20:25:33.758Z",
    description:
      "Flashcards array 27 containing 20 cards with back field lengths ranging from 5 to 6 characters",
  },
  {
    path: "/assets/flashcards-array-28.json",
    filename: "flashcards-array-28.json",
    arrayNumber: 28,
    localStorageKey: "spaced-repetition-cards-array-28",
    totalCards: 20,
    lengthDistribution: {
      "6": 20,
    },
    statistics: {
      averageBackLength: 6,
      minBackLength: 6,
      maxBackLength: 6,
    },
    createdAt: "2025-10-22T20:25:33.758Z",
    description:
      "Flashcards array 28 containing 20 cards with back field lengths ranging from 6 to 6 characters",
  },
  {
    path: "/assets/flashcards-array-29.json",
    filename: "flashcards-array-29.json",
    arrayNumber: 29,
    localStorageKey: "spaced-repetition-cards-array-29",
    totalCards: 20,
    lengthDistribution: {
      "6": 20,
    },
    statistics: {
      averageBackLength: 6,
      minBackLength: 6,
      maxBackLength: 6,
    },
    createdAt: "2025-10-22T20:25:33.758Z",
    description:
      "Flashcards array 29 containing 20 cards with back field lengths ranging from 6 to 6 characters",
  },
  {
    path: "/assets/flashcards-array-30.json",
    filename: "flashcards-array-30.json",
    arrayNumber: 30,
    localStorageKey: "spaced-repetition-cards-array-30",
    totalCards: 20,
    lengthDistribution: {
      "6": 20,
    },
    statistics: {
      averageBackLength: 6,
      minBackLength: 6,
      maxBackLength: 6,
    },
    createdAt: "2025-10-22T20:25:33.758Z",
    description:
      "Flashcards array 30 containing 20 cards with back field lengths ranging from 6 to 6 characters",
  },
  {
    path: "/assets/flashcards-array-31.json",
    filename: "flashcards-array-31.json",
    arrayNumber: 31,
    localStorageKey: "spaced-repetition-cards-array-31",
    totalCards: 20,
    lengthDistribution: {
      "6": 20,
    },
    statistics: {
      averageBackLength: 6,
      minBackLength: 6,
      maxBackLength: 6,
    },
    createdAt: "2025-10-22T20:25:33.759Z",
    description:
      "Flashcards array 31 containing 20 cards with back field lengths ranging from 6 to 6 characters",
  },
  {
    path: "/assets/flashcards-array-32.json",
    filename: "flashcards-array-32.json",
    arrayNumber: 32,
    localStorageKey: "spaced-repetition-cards-array-32",
    totalCards: 20,
    lengthDistribution: {
      "6": 20,
    },
    statistics: {
      averageBackLength: 6,
      minBackLength: 6,
      maxBackLength: 6,
    },
    createdAt: "2025-10-22T20:25:33.759Z",
    description:
      "Flashcards array 32 containing 20 cards with back field lengths ranging from 6 to 6 characters",
  },
  {
    path: "/assets/flashcards-array-33.json",
    filename: "flashcards-array-33.json",
    arrayNumber: 33,
    localStorageKey: "spaced-repetition-cards-array-33",
    totalCards: 20,
    lengthDistribution: {
      "6": 20,
    },
    statistics: {
      averageBackLength: 6,
      minBackLength: 6,
      maxBackLength: 6,
    },
    createdAt: "2025-10-22T20:25:33.759Z",
    description:
      "Flashcards array 33 containing 20 cards with back field lengths ranging from 6 to 6 characters",
  },
  {
    path: "/assets/flashcards-array-34.json",
    filename: "flashcards-array-34.json",
    arrayNumber: 34,
    localStorageKey: "spaced-repetition-cards-array-34",
    totalCards: 20,
    lengthDistribution: {
      "6": 20,
    },
    statistics: {
      averageBackLength: 6,
      minBackLength: 6,
      maxBackLength: 6,
    },
    createdAt: "2025-10-22T20:25:33.759Z",
    description:
      "Flashcards array 34 containing 20 cards with back field lengths ranging from 6 to 6 characters",
  },
  {
    path: "/assets/flashcards-array-35.json",
    filename: "flashcards-array-35.json",
    arrayNumber: 35,
    localStorageKey: "spaced-repetition-cards-array-35",
    totalCards: 20,
    lengthDistribution: {
      "6": 20,
    },
    statistics: {
      averageBackLength: 6,
      minBackLength: 6,
      maxBackLength: 6,
    },
    createdAt: "2025-10-22T20:25:33.759Z",
    description:
      "Flashcards array 35 containing 20 cards with back field lengths ranging from 6 to 6 characters",
  },
  {
    path: "/assets/flashcards-array-36.json",
    filename: "flashcards-array-36.json",
    arrayNumber: 36,
    localStorageKey: "spaced-repetition-cards-array-36",
    totalCards: 20,
    lengthDistribution: {
      "6": 20,
    },
    statistics: {
      averageBackLength: 6,
      minBackLength: 6,
      maxBackLength: 6,
    },
    createdAt: "2025-10-22T20:25:33.760Z",
    description:
      "Flashcards array 36 containing 20 cards with back field lengths ranging from 6 to 6 characters",
  },
  {
    path: "/assets/flashcards-array-37.json",
    filename: "flashcards-array-37.json",
    arrayNumber: 37,
    localStorageKey: "spaced-repetition-cards-array-37",
    totalCards: 20,
    lengthDistribution: {
      "6": 3,
      "7": 17,
    },
    statistics: {
      averageBackLength: 6.85,
      minBackLength: 6,
      maxBackLength: 7,
    },
    createdAt: "2025-10-22T20:25:33.760Z",
    description:
      "Flashcards array 37 containing 20 cards with back field lengths ranging from 6 to 7 characters",
  },
  {
    path: "/assets/flashcards-array-38.json",
    filename: "flashcards-array-38.json",
    arrayNumber: 38,
    localStorageKey: "spaced-repetition-cards-array-38",
    totalCards: 20,
    lengthDistribution: {
      "7": 20,
    },
    statistics: {
      averageBackLength: 7,
      minBackLength: 7,
      maxBackLength: 7,
    },
    createdAt: "2025-10-22T20:25:33.760Z",
    description:
      "Flashcards array 38 containing 20 cards with back field lengths ranging from 7 to 7 characters",
  },
  {
    path: "/assets/flashcards-array-39.json",
    filename: "flashcards-array-39.json",
    arrayNumber: 39,
    localStorageKey: "spaced-repetition-cards-array-39",
    totalCards: 20,
    lengthDistribution: {
      "7": 20,
    },
    statistics: {
      averageBackLength: 7,
      minBackLength: 7,
      maxBackLength: 7,
    },
    createdAt: "2025-10-22T20:25:33.760Z",
    description:
      "Flashcards array 39 containing 20 cards with back field lengths ranging from 7 to 7 characters",
  },
  {
    path: "/assets/flashcards-array-40.json",
    filename: "flashcards-array-40.json",
    arrayNumber: 40,
    localStorageKey: "spaced-repetition-cards-array-40",
    totalCards: 20,
    lengthDistribution: {
      "7": 20,
    },
    statistics: {
      averageBackLength: 7,
      minBackLength: 7,
      maxBackLength: 7,
    },
    createdAt: "2025-10-22T20:25:33.761Z",
    description:
      "Flashcards array 40 containing 20 cards with back field lengths ranging from 7 to 7 characters",
  },
  {
    path: "/assets/flashcards-array-41.json",
    filename: "flashcards-array-41.json",
    arrayNumber: 41,
    localStorageKey: "spaced-repetition-cards-array-41",
    totalCards: 20,
    lengthDistribution: {
      "7": 19,
      "8": 1,
    },
    statistics: {
      averageBackLength: 7.05,
      minBackLength: 7,
      maxBackLength: 8,
    },
    createdAt: "2025-10-22T20:25:33.761Z",
    description:
      "Flashcards array 41 containing 20 cards with back field lengths ranging from 7 to 8 characters",
  },
  {
    path: "/assets/flashcards-array-42.json",
    filename: "flashcards-array-42.json",
    arrayNumber: 42,
    localStorageKey: "spaced-repetition-cards-array-42",
    totalCards: 20,
    lengthDistribution: {
      "8": 20,
    },
    statistics: {
      averageBackLength: 8,
      minBackLength: 8,
      maxBackLength: 8,
    },
    createdAt: "2025-10-22T20:25:33.761Z",
    description:
      "Flashcards array 42 containing 20 cards with back field lengths ranging from 8 to 8 characters",
  },
  {
    path: "/assets/flashcards-array-43.json",
    filename: "flashcards-array-43.json",
    arrayNumber: 43,
    localStorageKey: "spaced-repetition-cards-array-43",
    totalCards: 20,
    lengthDistribution: {
      "8": 20,
    },
    statistics: {
      averageBackLength: 8,
      minBackLength: 8,
      maxBackLength: 8,
    },
    createdAt: "2025-10-22T20:25:33.761Z",
    description:
      "Flashcards array 43 containing 20 cards with back field lengths ranging from 8 to 8 characters",
  },
  {
    path: "/assets/flashcards-array-44.json",
    filename: "flashcards-array-44.json",
    arrayNumber: 44,
    localStorageKey: "spaced-repetition-cards-array-44",
    totalCards: 20,
    lengthDistribution: {
      "8": 20,
    },
    statistics: {
      averageBackLength: 8,
      minBackLength: 8,
      maxBackLength: 8,
    },
    createdAt: "2025-10-22T20:25:33.762Z",
    description:
      "Flashcards array 44 containing 20 cards with back field lengths ranging from 8 to 8 characters",
  },
  {
    path: "/assets/flashcards-array-45.json",
    filename: "flashcards-array-45.json",
    arrayNumber: 45,
    localStorageKey: "spaced-repetition-cards-array-45",
    totalCards: 20,
    lengthDistribution: {
      "8": 11,
      "9": 9,
    },
    statistics: {
      averageBackLength: 8.45,
      minBackLength: 8,
      maxBackLength: 9,
    },
    createdAt: "2025-10-22T20:25:33.762Z",
    description:
      "Flashcards array 45 containing 20 cards with back field lengths ranging from 8 to 9 characters",
  },
  {
    path: "/assets/flashcards-array-46.json",
    filename: "flashcards-array-46.json",
    arrayNumber: 46,
    localStorageKey: "spaced-repetition-cards-array-46",
    totalCards: 20,
    lengthDistribution: {
      "9": 20,
    },
    statistics: {
      averageBackLength: 9,
      minBackLength: 9,
      maxBackLength: 9,
    },
    createdAt: "2025-10-22T20:25:33.762Z",
    description:
      "Flashcards array 46 containing 20 cards with back field lengths ranging from 9 to 9 characters",
  },
  {
    path: "/assets/flashcards-array-47.json",
    filename: "flashcards-array-47.json",
    arrayNumber: 47,
    localStorageKey: "spaced-repetition-cards-array-47",
    totalCards: 20,
    lengthDistribution: {
      "9": 18,
      "10": 2,
    },
    statistics: {
      averageBackLength: 9.1,
      minBackLength: 9,
      maxBackLength: 10,
    },
    createdAt: "2025-10-22T20:25:33.762Z",
    description:
      "Flashcards array 47 containing 20 cards with back field lengths ranging from 9 to 10 characters",
  },
  {
    path: "/assets/flashcards-array-48.json",
    filename: "flashcards-array-48.json",
    arrayNumber: 48,
    localStorageKey: "spaced-repetition-cards-array-48",
    totalCards: 20,
    lengthDistribution: {
      "10": 20,
    },
    statistics: {
      averageBackLength: 10,
      minBackLength: 10,
      maxBackLength: 10,
    },
    createdAt: "2025-10-22T20:25:33.763Z",
    description:
      "Flashcards array 48 containing 20 cards with back field lengths ranging from 10 to 10 characters",
  },
  {
    path: "/assets/flashcards-array-49.json",
    filename: "flashcards-array-49.json",
    arrayNumber: 49,
    localStorageKey: "spaced-repetition-cards-array-49",
    totalCards: 20,
    lengthDistribution: {
      "10": 9,
      "11": 11,
    },
    statistics: {
      averageBackLength: 10.55,
      minBackLength: 10,
      maxBackLength: 11,
    },
    createdAt: "2025-10-22T20:25:33.763Z",
    description:
      "Flashcards array 49 containing 20 cards with back field lengths ranging from 10 to 11 characters",
  },
  {
    path: "/assets/flashcards-array-50.json",
    filename: "flashcards-array-50.json",
    arrayNumber: 50,
    localStorageKey: "spaced-repetition-cards-array-50",
    totalCards: 20,
    lengthDistribution: {
      "11": 11,
      "12": 6,
      "13": 1,
      "14": 1,
      "15": 1,
    },
    statistics: {
      averageBackLength: 11.75,
      minBackLength: 11,
      maxBackLength: 15,
    },
    createdAt: "2025-10-22T20:25:33.764Z",
    description:
      "Flashcards array 50 containing 20 cards with back field lengths ranging from 11 to 15 characters",
  },
];

export default flashcardArraysMetadata;
