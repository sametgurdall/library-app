import React from "react";
import { Container, Typography, Box } from "@mui/material";
import "./Home.css";

function Home() {
  return (
    <Container>
      <Box className="home">
        <Typography variant="h4" gutterBottom>
          Welcome to the Library Management System
        </Typography>
        <Typography variant="h6">
          You can do all book, author, and category transactions here.
        </Typography>
      </Box>
    </Container>
  )
}

export default Home
