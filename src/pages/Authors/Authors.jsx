import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import TextField from "@mui/material/TextField";
import "./Authors.css";

const initialAuthor = {
  name: "",
  birthDate: "",
  country: "",
};

function Authors() {
  const [newAuthor, setNewAuthor] = useState(initialAuthor);
  const [updateAuthor, setUpdateAuthor] = useState(initialAuthor);
  const [authors, setAuthors] = useState(null);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const request = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/authors");
      setAuthors(res.data);
      setUpdate(true);
    };
    request();
  }, [update]);

  const handleAuthorPost = async () => {
    await axios.post(import.meta.env.VITE_BASE_URL + "/api/v1/authors", newAuthor);
    setUpdate(false);
    setNewAuthor(initialAuthor);
    handleAlert("Author Added");
  };

  const handleAlert = (alertM) => {
    setAlertMessage(alertM);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handleAuthorDelete = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/v1/authors/${id}`
    );
    handleAlert(response.data);
    setUpdate(false);
  };

  const handleUpdateForm = (author) => {
    setUpdateAuthor(author);
  };

  const handleUpdateAuthor = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/v1/authors/${updateAuthor.id}`,
      updateAuthor
    );
    setUpdateAuthor(initialAuthor);
    handleAlert("Author Updated");
    setUpdate(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#E8D5B9",
        minHeight: "100vh",
        padding: "20px",
        color: "#4A3627",
      }}
    >
      {/* Yeni yazar ekleme alanı */}
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: "#4A3627" }}>
        New Authors
      </Typography>
      <div
        className="newAuthor"
        style={{
          display: "flex",
          flexWrap: "wrap", // Küçük ekranlarda öğeler alt alta gelir
          gap: "16px", // Öğeler arasında boşluk
          justifyContent: "center", // Öğeleri ortalar
          marginBottom: "20px",
        }}
      >
        {Object.keys(initialAuthor).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            type={key === "birthDate" ? "date" : "text"}
            label={
              key === "name"
                ? "Name"
                : key === "birthDate"
                ? " "
                : key === "country"
                ? "Country"
                : ""
            }
            variant="standard"
            value={newAuthor[key]}
            onChange={(e) =>
              setNewAuthor((prev) => ({ ...prev, [key]: e.target.value }))
            }
            sx={{
              flex: "1 1 200px", // Esnek genişlik, minimum 200px
              maxWidth: "100%", // Taşmayı engeller
              "& .MuiInputBase-root": { height: 32 },
              input: { color: "#4A3627" },
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
              "& .MuiInputLabel-root": { color: "#8B6F47" },
            }}
          />
        ))}
        <Button
          variant="contained"
          onClick={handleAuthorPost}
          sx={{
            flex: "1 1 200px", // Buton da esnek genişlikte
            maxWidth: "100%",
            bgcolor: "#4A3627",
            color: "#F5F5DC",
            "&:hover": { bgcolor: "#6B4E31" },
          }}
        >
          Add New Author
        </Button>
      </div>

      {/* Yazar güncelleme alanı */}
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, mt: 4, color: "#4A3627" }}>
        Update Author
      </Typography>
      <div
        className="newAuthor"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {Object.keys(initialAuthor).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            type={key === "birthDate" ? "date" : "text"}
            label={key === "birthDate" ? " " : key}
            variant="standard"
            value={updateAuthor[key]}
            onChange={(e) =>
              setUpdateAuthor((prev) => ({ ...prev, [key]: e.target.value }))
            }
            sx={{
              flex: "1 1 200px",
              maxWidth: "100%",
              "& .MuiInputBase-root": { height: 32 },
              input: { color: "#4A3627" },
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
              "& .MuiInputLabel-root": { color: "#8B6F47" },
            }}
          />
        ))}
        <Button
          variant="contained"
          onClick={handleUpdateAuthor}
          sx={{
            flex: "1 1 200px",
            maxWidth: "100%",
            bgcolor: "#4A3627",
            color: "#F5F5DC",
            "&:hover": { bgcolor: "#6B4E31" },
          }}
        >
          Update Author
        </Button>
      </div>

      {/* Yazarları listeleme alanı */}
      <Typography variant="h1" sx={{ textAlign: "center", mb: 3, mt: 4, color: "#4A3627" }}>
        Authors
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#F5F5DC" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Name</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Birth Date</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Country</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Delete</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors?.map((author) => (
              <TableRow
                key={author.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, bgcolor: "#FFF5E1" }}
              >
                <TableCell align="center" component="th" scope="row" sx={{ color: "#4A3627" }}>
                  {author.name}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {author.birthDate}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {author.country}
                </TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handleAuthorDelete(author.id)}
                    sx={{ color: "#4A3627" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <ArrowUpwardIcon
                    className="updateAuthor"
                    onClick={() => handleUpdateForm(author)}
                    sx={{ color: "#4A3627" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {alert && (
        <Typography variant="h6" sx={{ color: "#4A3627", textAlign: "center", mt: 2 }}>
          {alertMessage}
        </Typography>
      )}
    </div>
  );
}

export default Authors;