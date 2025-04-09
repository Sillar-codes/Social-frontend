import { Entity } from "@/types";
import { User } from "@/types/auth";

export interface Post extends Entity {
  user: Pick<User, "_id" | "name" | "email">;
  title: string;
  content: string;
  likes: string[];
  comments: Comment[];
}

export type PostFormData = Pick<Post, "title" | "content">;

export type PostError = Partial<Post>;

export interface Comment extends Entity {
  content: string;
}

export type CommentFormData = Pick<Comment, "content">;
