import React from "react";
import { Container } from "@mui/system";
import { Button, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container component={Paper} sx={{ height: 400  }}>
      <Typography gutterBottom variant="h3">
        Oops - we could not fid what you are looking for
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Go Back to Shop
      </Button>
    </Container>
  );
};

export default NotFound;
