import { Entity } from "..";

export interface User extends Entity {
  name: string;
  email: string;
  following: string[];
  followers: string[];
  password?: string;
  confirmPassword: string;
  isFollowing?: boolean;
}

export interface AuthFormData {
  name?: string;
  email: string;
  prevPassword?: string;
  password: string;
  confirmPassword?: string;
}

export type LoginAction = { type: string; payload?: User | boolean };
