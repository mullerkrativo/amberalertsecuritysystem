import { Typography, Box } from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ textAlign: "center", mb: 4 }}>
      <Typography variant="h3">
        🚨 AMBER ALERT NIGERIA
      </Typography>

      <Typography variant="subtitle1">
        National Child Recovery System
      </Typography>
    </Box>
  );
}