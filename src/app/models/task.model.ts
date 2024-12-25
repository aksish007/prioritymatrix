export interface Task {
  _id?: string;
  title: string;
  description: string;
  urgent: number; // urgency level from 1 to 5
  important: number; // importance level from 1 to 5
  userId: string;
  isMatrixTask?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
