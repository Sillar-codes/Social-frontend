import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { orange } from "@mui/material/colors";

import { User } from "@/types/auth";
import AppIcon from "@/components/AppIcon";
import { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";

interface Props {
  user: User;
  handleFollow: (follow: boolean, userId: string) => Promise<void>;
}

export default function UserItem({ user, handleFollow }: Props) {
  const context = useContext(GlobalContext);
  if (context == null) return;

  const { currentUser } = context.globalState;

  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: orange[500] }}>
              {user.name[0].toUpperCase()}
            </Avatar>
          }
          title={<Typography variant="h6">{user.name}</Typography>}
          action={
            currentUser != null ? (
              user.isFollowing ? (
                <IconButton
                  onClick={() => handleFollow(false, user._id)}
                  color="error"
                >
                  <AppIcon name="thumbDown" />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleFollow(true, user._id)}>
                  <AppIcon name="thumbUp" />
                </IconButton>
              )
            ) : (
              <></>
            )
          }
        />
        <CardContent>
          <Typography>Email: {user.email}</Typography>
          <Typography>Followers: {user.followers.length}</Typography>
          <Typography>Following: {user.following.length}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
