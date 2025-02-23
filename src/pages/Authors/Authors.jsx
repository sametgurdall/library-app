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

// Başlangıçta boş bir yazar nesnesi tanımlanıyor
const initialAuthor = {
  name: "",
  birthDate: "",
  country: "",
};

function Authors() {
  // State değişkenleri tanımlanıyor
  const [newAuthor, setNewAuthor] = useState(initialAuthor);
  const [updateAuthor, setUpdateAuthor] = useState(initialAuthor);
  const [authors, setAuthors] = useState(null);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Sayfa yüklendiğinde veya update değiştiğinde yazarları çekme işlemi
  useEffect(() => {
    const request = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/authors");
      setAuthors(res.data);
      console.log(res.data);
      setUpdate(true);
    };
    request();
  }, [update]);

  // Yeni yazar ekleme işlemi
  const handleAuthorPost = async () => {
    await axios.post(import.meta.env.VITE_BASE_URL + "/api/v1/authors", newAuthor);
    setUpdate(false);
    setNewAuthor(initialAuthor);
    handleAlert("Author Added");
    console.log(newAuthor);
  };

  // Kullanıcıya mesaj göstermek için alert fonksiyonu
  const handleAlert = (alertM) => {
    setAlertMessage(alertM);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  // Yazar silme işlemi
  const handleAuthorDelete = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL }/api/v1/authors/${id}`
    );
    handleAlert(response.data);
    setUpdate(false);
  };

  // Güncelleme formuna yazar bilgilerini ekleme işlemi
  const handleUpdateForm = (author) => {
    setUpdateAuthor(author);
  };

  // Yazar güncelleme işlemi
  const handleUpdateAuthor = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL }/api/v1/authors/${updateAuthor.id}`,
      updateAuthor
    );
    setUpdateAuthor(initialAuthor);
    handleAlert("Author Updated");
    setUpdate(false);
  };

  return (
    <div>
      {/* Yeni yazar ekleme alanı */}
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        New Authors
      </Typography>
      <div className="newAuthor">
        {Object.keys(initialAuthor).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            type={key === "birthDate" ? "date" : "text"}
            label={key === "name"
                ? "Name"
                : key === "birthDate"
                ? " "
                : key === "country"
                ? "Country"
                : ""}
            variant="standard"
            value={newAuthor[key]}
            onChange={(e) =>
              setNewAuthor((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button variant="contained" onClick={handleAuthorPost}>
          Add New Author
        </Button>
      </div>

      {/* Yazar güncelleme alanı */}
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Update Author
      </Typography>

      <div className="newAuthor">
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
          />
        ))}
        <Button variant="contained" onClick={handleUpdateAuthor}>
          Update Author
        </Button>
      </div>

      {/* Yazarları listeleme alanı */}
      <Typography variant="h1" style={{ textAlign: "center", margin: "20px" }}>
        Authors
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Birth Date</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors?.map((author) => (
              <TableRow
                key={author.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {author.name}
                </TableCell>
                <TableCell align="center">{author.birthDate}</TableCell>
                <TableCell align="center">{author.country}</TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handleAuthorDelete(author.id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <ArrowUpwardIcon
                    className="updateAuthor"
                    onClick={() => handleUpdateForm(author)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {alert && <h1>{alertMessage}</h1>}
    </div>
  );
}

export default Authors;