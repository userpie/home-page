export interface CollectionMetadata {
  path?: string;
  name: string;
  id: uuid;
  totalCards: number;
  dueCards?: number;
  lengthDistribution: Record<string, number>;
  statistics: {
    averageBackLength: number;
    minBackLength: number;
    maxBackLength: number;
  };
  createdAt: string;
  description: string;
}

export type uuid = `${string}-${string}-${string}-${string}-${string}`;
