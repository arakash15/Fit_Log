export interface Workout {
  id: string;
  name: string;
  image: string;
  categories: string[];
  equipment: string;
  difficulty: string;
  sets: string;
  reps: string;
  duration: number;
  calories: number;
  rating: number;
  description: string;
  instructions: string[];
}

export type SortKey = "duration" | "calories" | "rating";
