import { useContext, useState } from "react";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";

import { Comment, Post } from "@/types/post";
import GlobalContext from "@/context/GlobalContext";
import { EDITING_COMMENT, NOT_EDITING } from "@/constants";
import AddComment from "@/components/Feed/Comment/AddComment";
import CommentItem from "@/components/Feed/Comment";
import AppIcon from "@/components/AppIcon";

interface Props {
  data: Post;
  handleLike: (like: boolean, postId: string) => void;
}

export default function PostItem({ data, handleLike }: Props) {
  const [isEditing, setIsEditing] = useState<string>(NOT_EDITING);
  const [comments, setComments] = useState<Comment[]>(data.comments);

  const context = useContext(GlobalContext);
  if (!context) return;
  const { currentUser } = context.globalState;
  if (!currentUser) return;

  const handleComment = () => {
    setIsEditing(isEditing === EDITING_COMMENT ? NOT_EDITING : EDITING_COMMENT);
  };

  const addedComment = (updatedComments: Comment[]) => {
    setIsEditing(NOT_EDITING);
    setComments(updatedComments);
  };

  return (
    <Stack direction="column" spacing={2} marginTop={5}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: orange[500] }}>
          {data.user.name[0].toUpperCase()}
        </Avatar>
        <Stack direction="column">
          <Typography variant="h6">{data.user.email}</Typography>
          <Stack direction="row" spacing={2}>
            <Typography color="textDisabled">
              Created At: {new Date(data.createdAt).toDateString()}
            </Typography>
            <Typography color="textDisabled">
              Updated At: {new Date(data.updatedAt).toDateString()}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack px={3} direction="column" spacing={2}>
        <Typography variant="h4">{data.title}</Typography>
        <Typography>{data.content}</Typography>
      </Stack>
      <Stack direction="row" spacing={2} px={3}>
        <Stack direction="row" spacing={1} alignItems="center">
          <AppIcon name="thumbUp" size="20px" />
          <Typography>{data.likes.length}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <AppIcon name="comment" size="20px" />
          <Typography>{comments.length}</Typography>
        </Stack>
        {
          <>
            {!data.likes.includes(currentUser._id) ? (
              <Button
                onClick={() => handleLike(true, data._id)}
                variant="contained"
              >
                Like
              </Button>
            ) : (
              <Button
                onClick={() => handleLike(false, data._id)}
                variant="contained"
                color="warning"
              >
                Unlike
              </Button>
            )}

            <Button
              onClick={() => handleComment()}
              color={isEditing === EDITING_COMMENT ? "error" : "primary"}
              variant="contained"
              startIcon={<AppIcon name="addComment" />}
              size="small"
            >
              {isEditing === EDITING_COMMENT ? "Cancel" : "New Comment"}
            </Button>
          </>
        }
      </Stack>

      {isEditing === EDITING_COMMENT ? (
        <AddComment postId={data._id} addedComment={addedComment} />
      ) : (
        <></>
      )}
      <Stack direction="column" spacing={1} px={5}>
        {comments.map((comment, index) => (
          <CommentItem key={`comment${index}`} data={comment} />
        ))}
      </Stack>
      <Box component="hr" />
    </Stack>
  );
}
