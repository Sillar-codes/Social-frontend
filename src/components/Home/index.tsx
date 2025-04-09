import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";

import GlobalContext from "@/context/GlobalContext";
import AppIcon from "@/components/AppIcon";
import CustomLink from "@/components/CustomLink";

export default function Home() {
  const context = useContext(GlobalContext);

  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h1" textAlign="center">
        Welcome To Social
      </Typography>
      <Box sx={{ display: "flex" }} justifyContent="center">
        <Button
          variant="outlined"
          size="large"
          startIcon={<AppIcon name="account" />}
        >
          {!context?.globalState.currentUser ? (
            <Box component={CustomLink} to="/login" width="100%">
              Login
            </Box>
          ) : (
            <Box component={CustomLink} to="/explore" width="100%">
              Explore
            </Box>
          )}
        </Button>
      </Box>
    </Stack>
  );
}
