import { ChangeEvent, FormEvent, useContext, useState } from "react";

import { Comment, CommentFormData, Post } from "@/types/post";
import { commentOnPost } from "@/services";
import { Button, Stack, TextField } from "@mui/material";
import GlobalContext from "@/context/GlobalContext";
import { ACTION_LOADING } from "@/constants";

interface Props {
  postId: string;
  addedComment: (updatedComments: Comment[]) => void;
}

export default function AddComment({ postId, addedComment }: Props) {
  const [comment, setComment] = useState<CommentFormData>({
    content: "",
  });
  const context = useContext(GlobalContext);
  if (!context) return;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    context.globalDispatch({ type: ACTION_LOADING, payload: true });
    const data = await commentOnPost(postId, comment);
    setComment({ content: "" } as Comment);
    addedComment((data as Post).comments);
    context.globalDispatch({ type: ACTION_LOADING, payload: false });
  };

  return (
    <Stack
      direction="column"
      component="form"
      spacing={2}
      px={5}
      onSubmit={handleSubmit}
    >
      <TextField
        name="content"
        value={comment.content}
        label="Comment"
        placeholder="Add the Comment"
        onChange={handleChange}
        variant="filled"
        multiline
      />
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </Stack>
  );
}
