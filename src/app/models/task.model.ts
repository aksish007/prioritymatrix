export interface Task {
    id: number;
    title: string;
    description: string;
    urgent: number; // urgency level from 1 to 5
    important: number; // importance level from 1 to 5
  }
  