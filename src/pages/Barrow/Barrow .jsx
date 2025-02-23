import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./Barrow.css";

const initialBarrow = {
  borrowerName: "",
  borrowerMail: "",
  borrowingDate: "",
  returnDate: "",
  book: { id: "" },
};

function Barrow() {
  const [newBarrow, setNewBarrow] = useState(initialBarrow);
  const [updateBarrow, setUpdateBarrow] = useState(initialBarrow);
  const [barrows, setBarrows] = useState([]);
  const [books, setBooks] = useState([]);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Tüm ödünç almaları çekmek için fonksiyon
  const fetchBarrows = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/borrows");
      setBarrows(res.data);
    } catch (error) {
      console.error("Ödünç almalar çekilirken hata oluştu:", error);
    }
  };

  // Tüm kitapları çekmek için fonksiyon
  const fetchBooks = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/books");
      setBooks(res.data);
    } catch (error) {
      console.error("Kitaplar çekilirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchBarrows();
    fetchBooks();
  }, []);

  const handleBarrowPost = async () => {
    try {
      const selectedBook = books.find((book) => book.id === newBarrow.book.id);
  
      if (!selectedBook) {
        throw new Error("Kitap bulunamadı!");
      }
  
      const barrowToSend = {
        borrowerName: newBarrow.borrowerName,
        borrowerMail: newBarrow.borrowerMail,
        borrowingDate: newBarrow.borrowingDate,
        returnDate: newBarrow.returnDate,
        bookForBorrowingRequest: {
          id: selectedBook.id,
          name: selectedBook.name, 
          publicationYear: selectedBook.publicationYear, 
          stock: selectedBook.stock 
        }
      };
  
      console.log("Gönderilen Veri:", JSON.stringify(barrowToSend, null, 2));
  
      const response = await axios.post(import.meta.env.VITE_BASE_URL + "/api/v1/borrows", barrowToSend);
      handleAlert("Barrow Added");
      setNewBarrow(initialBarrow);
      fetchBarrows();
    } catch (error) {
      console.error("Ödünç alma eklenirken hata oluştu:", error.response?.data || error.message);
      handleAlert(`Hata: ${error.response?.data?.message || error.message}`);
    }
  };
  

  const handleAlert = (alertM) => {
    setAlertMessage(alertM);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handleBarrowDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL }/api/v1/borrows/${id}`
      );
      handleAlert(response.data);
      fetchBarrows(); // Delete işleminden sonra listeyi güncelle
    } catch (error) {
      console.error("Ödünç alma silinirken hata oluştu:", error);
    }
  };

  const handleUpdateForm = (barrow) => {
    setUpdateBarrow(barrow);
  };

  const handleUpdateBarrow = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL }/api/v1/borrows/${updateBarrow.id}`,
        updateBarrow
      );
      setUpdateBarrow(initialBarrow);
      handleAlert("Barrow Updated");
      fetchBarrows(); // Güncellemeden sonra listeyi güncelle
    } catch (error) {
      console.error("Ödünç alma güncellenirken hata oluştu:", error);
    }
  };
  return (
    <div>
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        New Barrow
      </Typography>
      <div className="newBarrow">
        {["borrowerName", "borrowerMail"].map((key) => (
          <TextField
            key={key}
            autoComplete="off"
            type="text"
            label={key}
            variant="standard"
            value={newBarrow[key]}
            onChange={(e) =>
              setNewBarrow((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}

        {/* borrowingDate için date input */}
        <TextField
          autoComplete="off"
          type="date"
          label="Borrowing Date"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={newBarrow.borrowingDate}
          onChange={(e) =>
            setNewBarrow((prev) => ({ ...prev, borrowingDate: e.target.value }))
          }
        />

        {/* returnDate için date input */}
        <TextField
          autoComplete="off"
          type="date"
          label="Return Date"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={newBarrow.returnDate}
          onChange={(e) =>
            setNewBarrow((prev) => ({ ...prev, returnDate: e.target.value }))
          }
        />

        {/* Book için select */}
        <div key="book-select">
          <InputLabel id="select-label-book">Book</InputLabel>
          <Select
            labelId="select-label-book"
            id="select-book"
            value={newBarrow.book.id || ""}
            name="book"
            label="Book"
            onChange={(e) => {
              setNewBarrow((prev) => ({
                ...prev,
                book: { id: e.target.value },
              }));
            }}
          >
            {books?.map((book) => (
              <MenuItem key={book.id} value={book.id}>
                {book.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <Button variant="contained" onClick={handleBarrowPost}>
          Add New Barrow
        </Button>
      </div>

      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Update Barrow
      </Typography>

      <div className="newBarrow">
        {["borrowerName", "borrowerMail"].map((key) => (
          <TextField
            key={key}
            autoComplete="off"
            type="text"
            label={key}
            variant="standard"
            value={updateBarrow[key] || ""}
            onChange={(e) =>
              setUpdateBarrow((prev) => ({ ...prev, [key]: e.target.value }))
            }
          />
        ))}

        {/* Update: borrowingDate için date input */}
        <TextField
          autoComplete="off"
          type="date"
          label="Borrowing Date"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={updateBarrow.borrowingDate || ""}
          onChange={(e) =>
            setUpdateBarrow((prev) => ({
              ...prev,
              borrowingDate: e.target.value,
            }))
          }
        />

        {/* Update: returnDate için date input */}
        <TextField
          autoComplete="off"
          type="date"
          label="Return Date"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          value={updateBarrow.returnDate || ""}
          onChange={(e) =>
            setUpdateBarrow((prev) => ({ ...prev, returnDate: e.target.value }))
          }
        />

        {/* Update: Book select */}
        <div key="update-book-select">
          <InputLabel id="update-select-label-book">Book</InputLabel>
          <Select
            labelId="update-select-label-book"
            id="update-select-book"
            value={updateBarrow.book?.id || ""}
            name="book"
            label="Book"
            onChange={(e) => {
              setUpdateBarrow((prev) => ({
                ...prev,
                book: { id: e.target.value },
              }));
            }}
          >
            {books?.map((book) => (
              <MenuItem key={book.id} value={book.id}>
                {book.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <Button variant="contained" onClick={handleUpdateBarrow}>
          Update Barrow
        </Button>
      </div>

      <Typography variant="h1" style={{ textAlign: "center", margin: "20px" }}>
        Barrow
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Borrower Name</TableCell>
              <TableCell align="center">Borrower Mail</TableCell>
              <TableCell align="center">Borrowing Date</TableCell>
              <TableCell align="center">Return Date</TableCell>
              <TableCell align="center">Book</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {barrows?.map((barrow) => (
              <TableRow
                key={barrow.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {barrow.borrowerName}
                </TableCell>
                <TableCell align="center">{barrow.borrowerMail}</TableCell>
                <TableCell align="center">{barrow.borrowingDate}</TableCell>
                <TableCell align="center">{barrow.returnDate}</TableCell>
                <TableCell align="center">{barrow.book?.name}</TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handleBarrowDelete(barrow.id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <ArrowUpwardIcon
                    className="updateBarrow"
                    onClick={() => handleUpdateForm(barrow)}
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

export default Barrow;
