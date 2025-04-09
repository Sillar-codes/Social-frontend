import { useContext } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import GlobalContext from "@/context/GlobalContext";
import CustomLink from "@/components/CustomLink";
import { ROUTES } from "@/configs/routes";

export default function Profile() {
  const context = useContext(GlobalContext);
  if (!context) return;

  const { currentUser } = context.globalState;

  return (
    <Stack direction="row" justifyContent="center" marginTop={2}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ width: { xs: "80%", md: "40%" } }}
      >
        <Typography variant="h2" textAlign="center">
          {currentUser?.name}
        </Typography>
        <hr />
        <Typography>Email: {currentUser?.email}</Typography>
        <Typography>Followers: {currentUser?.followers.length}</Typography>
        <Typography>Follwing: {currentUser?.following.length}</Typography>
        <Button variant="contained">
          <Box component={CustomLink} to={ROUTES.UPDATE} width="100%">
            UPDATE
          </Box>
        </Button>
      </Stack>
    </Stack>
  );
}
