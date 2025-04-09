import { Stack, Typography } from "@mui/material";

import AppIcon from "@/components/AppIcon";
import CustomLink from "@/components/CustomLink";
import { ROUTES } from "@/configs/routes";

export default function Logo() {
  return (
    <Stack alignItems="center" direction="row">
      <AppIcon name="adb" />
      <Typography
        variant="h6"
        noWrap
        component={CustomLink}
        to={ROUTES.HOME}
        sx={{
          mr: 2,
          fontWeight: 700,
        }}
      >
        SOCIAL
      </Typography>
    </Stack>
  );
}
