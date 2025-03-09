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
  MenuItem,
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
          stock: selectedBook.stock,
        },
      };

      console.log("Gönderilen Veri:", JSON.stringify(barrowToSend, null, 2));

      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/borrows",
        barrowToSend
      );
      handleAlert("Barrow Added");
      setNewBarrow(initialBarrow);
      fetchBarrows();
    } catch (error) {
      console.error(
        "Ödünç alma eklenirken hata oluştu:",
        error.response?.data || error.message
      );
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
        `${import.meta.env.VITE_BASE_URL}/api/v1/borrows/${id}`
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
        `${import.meta.env.VITE_BASE_URL}/api/v1/borrows/${updateBarrow.id}`,
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
    <div
      style={{
        backgroundColor: "#E8D5B9", // Açık bej-kahve arka plan
        minHeight: "100vh",
        padding: "20px",
        color: "#4A3627", // Koyu kahve yazı
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: "#4A3627" }}>
        New Barrow
      </Typography>
      <div
        className="newBarrow"
        style={{
          display: "flex",
          flexWrap: "wrap", // Küçük ekranlarda öğeler alt alta gelir
          gap: "16px", // Öğeler arasında boşluk
          justifyContent: "center", // Öğeleri ortalar
          marginBottom: "20px",
        }}
      >
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
            sx={{
              flex: "1 1 200px", // Esnek genişlik, minimum 200px
              maxWidth: "100%", // Taşmayı engeller
              "& .MuiInputBase-root": { height: 32 }, // Yükseklik
              input: { color: "#4A3627" }, // Koyu kahve yazı
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" }, // Orta kahve alt çizgi
              "& .MuiInputLabel-root": { color: "#8B6F47" }, // Orta kahve label
            }}
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
          sx={{
            flex: "1 1 200px",
            maxWidth: "100%",
            "& .MuiInputBase-root": { height: 32 },
            input: { color: "#4A3627" },
            "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
            "& .MuiInputLabel-root": { color: "#8B6F47" },
          }}
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
          sx={{
            flex: "1 1 200px",
            maxWidth: "100%",
            "& .MuiInputBase-root": { height: 32 },
            input: { color: "#4A3627" },
            "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
            "& .MuiInputLabel-root": { color: "#8B6F47" },
          }}
        />

        {/* Book için select */}
        <TextField
          select
          label="Book"
          value={newBarrow.book.id || ""}
          onChange={(e) =>
            setNewBarrow((prev) => ({
              ...prev,
              book: { id: e.target.value },
            }))
          }
          variant="standard"
          sx={{
            flex: "1 1 200px", // Diğer inputlarla aynı esnek genişlik
            maxWidth: "100%", // Taşmayı engeller
            "& .MuiInputBase-root": { height: 32 }, // Yükseklik eşitleme
            "& .MuiSelect-select": {
              padding: "6px 12px", // Padding’i diğer inputlarla eşitlemek için
              color: "#4A3627", // Koyu kahve yazı
            },
            "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" }, // Orta kahve alt çizgi
            "& .MuiInputLabel-root": { color: "#8B6F47" }, // Orta kahve label
          }}
        >
          {books?.map((book) => (
            <MenuItem key={book.id} value={book.id}>
              {book.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={handleBarrowPost}
          sx={{
            flex: "1 1 200px", // Buton da esnek genişlikte
            maxWidth: "100%",
            bgcolor: "#4A3627", // Koyu kahve buton
            color: "#F5F5DC", // Bej yazı
            "&:hover": { bgcolor: "#6B4E31" }, // Hover için açık kahve
          }}
        >
          Add New Barrow
        </Button>
      </div>

      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, mt: 4, color: "#4A3627" }}>
        Update Barrow
      </Typography>

      <div
        className="newBarrow"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
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
          sx={{
            flex: "1 1 200px",
            maxWidth: "100%",
            "& .MuiInputBase-root": { height: 32 },
            input: { color: "#4A3627" },
            "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
            "& .MuiInputLabel-root": { color: "#8B6F47" },
          }}
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
          sx={{
            flex: "1 1 200px",
            maxWidth: "100%",
            "& .MuiInputBase-root": { height: 32 },
            input: { color: "#4A3627" },
            "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
            "& .MuiInputLabel-root": { color: "#8B6F47" },
          }}
        />

        {/* Update: Book select */}
        <TextField
          select
          label="Book"
          value={updateBarrow.book?.id || ""}
          onChange={(e) =>
            setUpdateBarrow((prev) => ({
              ...prev,
              book: { id: e.target.value },
            }))
          }
          variant="standard"
          sx={{
            flex: "1 1 200px", // Diğer inputlarla aynı esnek genişlik
            maxWidth: "100%", // Taşmayı engeller
            "& .MuiInputBase-root": { height: 32 }, // Yükseklik eşitleme
            "& .MuiSelect-select": {
              padding: "6px 12px", // Padding’i diğer inputlarla eşitlemek için
              color: "#4A3627", // Koyu kahve yazı
            },
            "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" }, // Orta kahve alt çizgi
            "& .MuiInputLabel-root": { color: "#8B6F47" }, // Orta kahve label
          }}
        >
          {books?.map((book) => (
            <MenuItem key={book.id} value={book.id}>
              {book.name}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={handleUpdateBarrow}
          sx={{
            flex: "1 1 200px",
            maxWidth: "100%",
            bgcolor: "#4A3627",
            color: "#F5F5DC",
            "&:hover": { bgcolor: "#6B4E31" },
          }}
        >
          Update Barrow
        </Button>
      </div>

      <Typography variant="h1" sx={{ textAlign: "center", mb: 3, mt: 4, color: "#4A3627" }}>
        Barrows
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#F5F5DC" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Borrower Name</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>
                Borrower Mail
              </TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>
                Borrowing Date
              </TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>
                Return Date
              </TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Book</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Delete</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {barrows?.map((barrow) => (
              <TableRow
                key={barrow.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, bgcolor: "#FFF5E1" }}
              >
                <TableCell align="center" component="th" scope="row" sx={{ color: "#4A3627" }}>
                  {barrow.borrowerName}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {barrow.borrowerMail}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {barrow.borrowingDate}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {barrow.returnDate}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {barrow.book?.name}
                </TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handleBarrowDelete(barrow.id)}
                    sx={{ color: "#4A3627" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <ArrowUpwardIcon
                    className="updateBarrow"
                    onClick={() => handleUpdateForm(barrow)}
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

export default Barrow;