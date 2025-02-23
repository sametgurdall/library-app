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
import "./Publisher.css"

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
      `${import.meta.env.VITE_BASE_URL }/api/v1/publishers/${id}`
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
      `${import.meta.env.VITE_BASE_URL }/api/v1/publishers/${updatePublisher.id}`,
      updatePublisher
    );
    setUpdatePublisher(initialPublisher);
    handleAlert("Publisher Updated");
    setUpdate(false);
  };

  return (
    <div>
      {/* Yeni publisher ekleme formu */}
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        New Publisher
      </Typography>
      <div className="newPublisher">
        {Object.keys(initialPublisher).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            type={key === "establishmentYear" ? "number" : "text"}
            label={key === "name"
              ? "Name"
              : key === "establishmentYear"
              ? "Establishment Year"
              : key === "address"
              ? "Address"
              : ""}
            variant="standard"
            value={newPublisher[key]}
            onChange={(e) =>
              setNewPublisher((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button variant="contained" onClick={handlePublisherPost}>
          Add New Publisher
        </Button>
      </div>

      {/* Publisher güncelleme formu */}
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Update Publisher
      </Typography>
      <div className="newPublisher">
        {Object.keys(initialPublisher).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            type={key === "establishmentYear" ? "number" : "text"}
            label={key === "name"
              ? "Name"
              : key === "establishmentYear"
              ? "Establishment Year"
              : key === "address"
              ? "Address"
              : ""}
            variant="standard"
            value={updatePublisher[key]}
            onChange={(e) =>
              setUpdatePublisher((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}
        <Button variant="contained" onClick={handleUpdatePublisher}>
          Update Publisher
        </Button>
      </div>

      {/* Publisher listesi */}
      <Typography variant="h1" style={{ textAlign: "center", margin: "20px" }}>
        Publishers
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Establishment Year</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {publishers?.map((publisher) => (
              <TableRow key={publisher.id}>
                <TableCell>{publisher.name}</TableCell>
                <TableCell align="center">{publisher.establishmentYear}</TableCell>
                <TableCell align="center">{publisher.address}</TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon className="deleteIcon" onClick={() => handlePublisherDelete(publisher.id)} />
                </TableCell>
                <TableCell align="center">
                  <ArrowUpwardIcon onClick={() => handleUpdateForm(publisher)} />
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

export default Publisher;
