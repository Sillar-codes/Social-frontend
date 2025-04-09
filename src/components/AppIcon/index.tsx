import { Box } from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import AddCommentIcon from "@mui/icons-material/AddComment";
// import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ICON_MAPS = {
  adb: <AdbIcon />,
  menu: <MenuIcon />,
  thumbUp: <ThumbUpIcon />,
  thumbDown: <ThumbDownIcon />,
  comment: <CommentIcon />,
  addComment: <AddCommentIcon />,
  account: <AccountCircleIcon />,
};

interface Props {
  name: keyof typeof ICON_MAPS;
  size?: string | number;
}

export default function AppIcon({ name, size }: Props) {
  const IconComponent = ICON_MAPS[name];
  if (!IconComponent) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& svg": {
          width: size,
          height: size,
        },
      }}
    >
      {IconComponent}
    </Box>
  );
}
