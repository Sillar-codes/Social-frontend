import { Box, Button, Stack, Typography } from "@mui/material";

import CustomLink from "@/components/CustomLink";

export default function NotFound() {
  return (
    <Box sx={{ position: "absolute", width: "100%", height: "100vh" }}>
      <Stack
        direction="column"
        sx={{ position: "relative", width: "100%", height: "100%" }}
        alignItems="center"
      >
        <Typography variant="h1" textAlign="center">
          404 PAGE NOT FOUND
        </Typography>
        <Box>
          <Button variant="contained">
            <Box component={CustomLink} to="/">
              HOME
            </Box>
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
