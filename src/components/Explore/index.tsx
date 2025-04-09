import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";

import { exploreUsers, followUser, unFollowUser } from "@/services";
import { User } from "@/types/auth";
import GlobalContext from "@/context/GlobalContext";
import UserItem from "@/components/Explore/UserItem";
import { ACTION_LOADING } from "@/constants";
import { handleError } from "@/utils";

export default function Explore() {
  const [users, setUsers] = useState<User[]>([]);
  const context = useContext(GlobalContext);

  const handleExplore = useCallback(async () => {
    if (!context) return;

    const { currentUser } = context.globalState;
    context.globalDispatch({ type: ACTION_LOADING, payload: true });
    try {
      const data = await exploreUsers();
      const users = data as User[];
      for (const user of users) {
        user.isFollowing = user.followers.includes(
          currentUser ? currentUser._id.toString() : ""
        );
      }
      setUsers(users);
    } catch (err) {
      handleError(err);
    }
    context.globalDispatch({ type: ACTION_LOADING, payload: false });
  }, []);

  useEffect(() => {
    handleExplore();
  }, []);

  if (!context) return <></>;

  const handleFollow = async (follow: boolean, userId: string) => {
    context.globalDispatch({ type: ACTION_LOADING, payload: true });
    try {
      let changedUser: User;
      if (follow) {
        const data = await followUser(userId);
        changedUser = data as User;
      } else {
        const data = await unFollowUser(userId);
        changedUser = data as User;
      }
      changedUser.isFollowing = follow;
      const updatedUsers = users.map((user) =>
        user._id.toString() === userId ? changedUser : user
      );
      setUsers(updatedUsers);
    } catch (err) {
      console.log(err);
    }
    context.globalDispatch({ type: ACTION_LOADING, payload: false });
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={2} marginTop={5}>
        <Typography variant="h3">Explore Users</Typography>
        <Box component="hr" />
        <Grid container rowSpacing={2} columnSpacing={2}>
          {users.map((user, index) => (
            <UserItem
              key={`user${index}`}
              user={user}
              handleFollow={handleFollow}
            />
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
