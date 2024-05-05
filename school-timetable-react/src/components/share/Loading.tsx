import { Box, CircularProgress } from "@mui/material";

/** ローディング表示用コンポーネント */
const Loading = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export default Loading;
