import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom"; // React Router'dan Link bileşeni import edildi
import "./Home.css";
import library from "../../assets/library.jpg";

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
          <Button
            component={Link} // Link bileşeni ile butonu entegre ettik
            to="/book" // React Router için yönlendirme yolu
            variant="outlined"
            sx={{ color: "white", borderColor: "white", marginTop: 2 }}
          >
            Get Started
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;