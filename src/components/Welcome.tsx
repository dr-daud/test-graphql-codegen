import { Stack, Typography } from "@mui/material";

const Welcome = () => {
  return (
    <Stack
      component="main"
      sx={{
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fff",
        height: "calc(100vh - 32px - 80px)",
      }}
    >
      <Typography sx={{ fontSize: "46px" }}>Добро пожаловать</Typography>
    </Stack>
  );
};

export default Welcome;
