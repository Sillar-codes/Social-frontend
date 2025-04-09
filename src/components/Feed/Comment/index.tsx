import { Stack, Typography } from "@mui/material";

import { Comment } from "@/types/post";

interface Props {
  data: Comment;
}

export default function CommentItem({ data }: Props) {
  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1}></Stack>
      <Stack direction="column" spacing={1}>
        <Typography>{data.content}</Typography>
        <Typography color="textSecondary">
          Created At: {new Date(data.createdAt).toDateString()}
        </Typography>
      </Stack>
    </Stack>
  );
}
