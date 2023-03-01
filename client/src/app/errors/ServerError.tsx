import React from "react";
import { Container } from "@mui/system";
import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export const ServerError = () => {
  const { state } = useLocation();
  return (
    <Container component={Paper}>
      {state?.error ? (
        <>
          <Typography gutterBottom variant="h3" color="secondary">
            {state.error.title};
          </Typography>
          <Divider />
          <Typography variant="body1">
            {state.error.detail || "Internal server error"}
          </Typography>
        </>
      ) : (
        <Typography variant="h5">Server Error</Typography>
      )}
    </Container>
  );
};
