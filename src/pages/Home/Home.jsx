import React from "react";
import { Container, Typography, Box } from "@mui/material";
import "./Home.css";
import library from "../../assets/library.jpg";
import Button from '@mui/material/Button';

function Home() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${library})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "calc(100vh - 68.5px)", // Navbar yüksekliği çıkarıldı (64px varsayılan)
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 2 }}>
        <Box className="home">
          <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
            Welcome to the Library Management System
          </Typography>
          <Typography variant="h6" sx={{ color: "white" }}>
            You can do all book, author, and category transactions here.
          </Typography>
          <Button variant="outlined" href="/book"
          sx={{ color: "white", borderColor: "white", marginTop: 2 }}
          >Get Started</Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;