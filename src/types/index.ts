import { User } from "./auth";

export interface Entity {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface GlobalState {
  currentUser: User | null;
  isLoading: boolean;
}
