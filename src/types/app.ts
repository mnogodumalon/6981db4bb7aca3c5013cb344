// AUTOMATICALLY GENERATED TYPES - DO NOT EDIT

export interface Notiz {
  record_id: string;
  createdat: string;
  updatedat: string | null;
  fields: {
    titel?: string;
    inhalt?: string;
    datum?: string; // Format: YYYY-MM-DD oder ISO String
  };
}

export const APP_IDS = {
  NOTIZ: '6981db38e9dc8ebe4045b8f0',
} as const;

// Helper Types for creating new records
export type CreateNotiz = Notiz['fields'];