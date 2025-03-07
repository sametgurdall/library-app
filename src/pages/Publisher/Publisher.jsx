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
import "./Publisher.css";

// Başlangıç değeri olarak boş bir publisher nesnesi tanımlıyoruz.
const initialPublisher = {
  name: "",
  establishmentYear: "",
  address: "",
};

function Publisher() {
  // Publisher ekleme ve güncelleme işlemleri için state değişkenleri.
  const [newPublisher, setNewPublisher] = useState(initialPublisher);
  const [updatePublisher, setUpdatePublisher] = useState(initialPublisher);
  const [publishers, setPublishers] = useState(null);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Sayfa yüklendiğinde ve her güncellemede publisher listesini getiriyoruz.
  useEffect(() => {
    const request = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/publishers");
      setPublishers(res.data);
      console.log(res.data);
      setUpdate(true);
    };
    request();
  }, [update]);

  // Yeni bir publisher ekleme fonksiyonu
  const handlePublisherPost = async () => {
    await axios.post(import.meta.env.VITE_BASE_URL + "/api/v1/publishers", newPublisher);
    setUpdate(false);
    setNewPublisher(initialPublisher);
    handleAlert("Publisher Added");
    console.log(newPublisher);
  };

  // Uyarı mesajını gösteren fonksiyon
  const handleAlert = (alertM) => {
    setAlertMessage(alertM);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  // Publisher silme işlemi
  const handlePublisherDelete = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/v1/publishers/${id}`
    );
    handleAlert(response.data);
    setUpdate(false);
  };

  // Güncellenecek publisher'ın formda gösterilmesini sağlayan fonksiyon
  const handleUpdateForm = (publisher) => {
    setUpdatePublisher(publisher);
  };

  // Publisher güncelleme işlemi
  const handleUpdatePublisher = async () => {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/v1/publishers/${updatePublisher.id}`,
      updatePublisher
    );
    setUpdatePublisher(initialPublisher);
    handleAlert("Publisher Updated");
    setUpdate(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#E8D5B9", // Authors ile uyumlu açık bej-kahve
        minHeight: "100vh",
        padding: "20px",
        color: "#4A3627", // Navbar ile uyumlu koyu kahve yazı
      }}
    >
      {/* Yeni publisher ekleme formu */}
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: "#4A3627" }}>
        New Publisher
      </Typography>
      <div className="newPublisher">
        {Object.keys(initialPublisher).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            type={key === "establishmentYear" ? "number" : "text"}
            label={
              key === "name"
                ? "Name"
                : key === "establishmentYear"
                ? "Establishment Year"
                : key === "address"
                ? "Address"
                : ""
            }
            variant="standard"
            value={newPublisher[key]}
            onChange={(e) =>
              setNewPublisher((prev) => ({ ...prev, [key]: e.target.value }))
            }
            sx={{
              input: { color: "#4A3627" }, // Koyu kahve yazı
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" }, // Orta kahve alt çizgi
              "& .MuiInputLabel-root": { color: "#8B6F47" }, // Orta kahve label
            }}
          />
        ))}
        <Button
          variant="contained"
          onClick={handlePublisherPost}
          sx={{
            bgcolor: "#4A3627", // Navbar ile uyumlu koyu kahve
            color: "#F5F5DC", // Bej yazı
            "&:hover": { bgcolor: "#6B4E31" }, // Biraz daha açık kahve hover
          }}
        >
          Add New Publisher
        </Button>
      </div>

      {/* Publisher güncelleme formu */}
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, mt: 4, color: "#4A3627" }}>
        Update Publisher
      </Typography>
      <div className="newPublisher">
        {Object.keys(initialPublisher).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            type={key === "establishmentYear" ? "number" : "text"}
            label={
              key === "name"
                ? "Name"
                : key === "establishmentYear"
                ? "Establishment Year"
                : key === "address"
                ? "Address"
                : ""
            }
            variant="standard"
            value={updatePublisher[key]}
            onChange={(e) =>
              setUpdatePublisher((prev) => ({ ...prev, [key]: e.target.value }))
            }
            sx={{
              input: { color: "#4A3627" },
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
              "& .MuiInputLabel-root": { color: "#8B6F47" },
            }}
          />
        ))}
        <Button
          variant="contained"
          onClick={handleUpdatePublisher}
          sx={{
            bgcolor: "#4A3627", // Navbar ile uyumlu koyu kahve
            color: "#F5F5DC",
            "&:hover": { bgcolor: "#6B4E31" },
          }}
        >
          Update Publisher
        </Button>
      </div>

      {/* Publisher listesi */}
      <Typography variant="h1" sx={{ textAlign: "center", mb: 3, mt: 4, color: "#4A3627" }}>
        Publishers
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#F5F5DC" }}> {/* Bej, açık ton */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Name</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Establishment Year</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Address</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Delete</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publishers?.map((publisher) => (
              <TableRow
                key={publisher.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, bgcolor: "#FFF5E1" }} // Daha açık bej
              >
                <TableCell align="center" component="th" scope="row" sx={{ color: "#4A3627" }}>
                  {publisher.name}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {publisher.establishmentYear}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {publisher.address}
                </TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handlePublisherDelete(publisher.id)}
                    sx={{ color: "#4A3627" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <ArrowUpwardIcon
                    className="updateAuthor"
                    onClick={() => handleUpdateForm(publisher)}
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

export default Publisher;