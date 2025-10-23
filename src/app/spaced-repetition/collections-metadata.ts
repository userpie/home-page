export interface CollectionMetadata {
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
