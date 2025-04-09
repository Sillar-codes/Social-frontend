import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import { Post } from "@/types/post";
import { fetchPosts, likePost, unlikePost } from "@/services";
import PostItem from "@/components/Feed/PostItem";
import GlobalContext from "@/context/GlobalContext";
import { ACTION_LOADING } from "@/constants";
import CustomLink from "@/components/CustomLink";
import { handleError } from "@/utils";

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const context = useContext(GlobalContext);

  const handlePosts = useCallback(async () => {
    if (!context) return;
    const { globalDispatch } = context;
    globalDispatch({ type: ACTION_LOADING, payload: true });
    try {
      const data = await fetchPosts();
      setPosts(data as Post[]);
    } catch (err) {
      handleError(err);
    }
    globalDispatch({ type: ACTION_LOADING, payload: false });
  }, []);

  useEffect(() => {
    handlePosts();
  }, []);

  if (!context) return <></>;
  const { globalDispatch } = context;

  const handleLike = async (like: boolean, postId: string) => {
    globalDispatch({ type: ACTION_LOADING, payload: true });
    try {
      let response;
      if (like) response = await likePost(postId);
      else response = await unlikePost(postId);
      const updatedPosts: Post[] = posts.map((post) =>
        post._id === postId ? (response as Post) : post
      );
      setPosts(updatedPosts);
    } catch (err) {
      handleError(err);
    }
    globalDispatch({ type: ACTION_LOADING, payload: false });
  };

  return (
    <Box>
      <Button variant="contained" color="success">
        <Box component={CustomLink} to="/create">
          Create Post
        </Box>
      </Button>
      {posts.map((post, index) => (
        <PostItem key={`post${index}`} data={post} handleLike={handleLike} />
      ))}
    </Box>
  );
}
