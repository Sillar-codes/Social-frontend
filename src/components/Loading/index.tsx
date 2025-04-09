import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
        }}
      >
        <svg width={0} height={0}>
          <defs>
            <linearGradient
              id="progress_gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          size={80}
          sx={{
            position: "absolute",
            top: "calc(50% - 40px)",
            left: "calc(50% - 40px)",
            "svg circle": { stroke: "url(#progress_gradient)" },
          }}
        />
      </Box>
    </Box>
  );
}
