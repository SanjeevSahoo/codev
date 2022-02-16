import { Box, CircularProgress, Grid, Typography } from "@mui/material";

const LoadingPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Grid container>
          <Grid item xs={12} sx={{ textAlign: "center", marginBottom: 1 }}>
            <CircularProgress style={{ margin: 1 }} />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="h6" component="h6">
              Loading...! Please Wait.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LoadingPage;
