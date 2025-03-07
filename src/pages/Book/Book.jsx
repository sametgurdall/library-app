import { Button, Typography, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./Book.css";

const initialBook = {
  name: "",
  publicationYear: "",
  stock: "",
  author: {}, // Başlangıçta boş nesne
  publisher: {}, // Başlangıçta boş nesne
  categories: [], // Çoklu seçim için boş dizi
};

function Book() {
  const [newBook, setNewBook] = useState(initialBook);
  const [updateBook, setUpdateBook] = useState(initialBook);
  const [books, setBooks] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [publishers, setPublishers] = useState(null);
  const [categories, setCategories] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Kitapları çekmek için fonksiyon
  const fetchBooks = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/books");
      setBooks(res.data);
    } catch (error) {
      console.error("Kitapları çekerken hata oluştu:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, authorsRes, publishersRes, categoriesRes] =
          await Promise.all([
            axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/books"),
            axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/authors"),
            axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/publishers"),
            axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/categories"),
          ]);
        setBooks(booksRes.data);
        setAuthors(authorsRes.data);
        setPublishers(publishersRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Veriler çekilirken hata oluştu:", error);
      }
    };
    fetchData();
  }, []);

  const handleBookPost = async () => {
    try {
      const bookToSend = {
        name: newBook.name,
        publicationYear: newBook.publicationYear,
        stock: newBook.stock,
        author: { id: newBook.author.id }, // Sadece id içeren nesne
        publisher: { id: newBook.publisher.id }, // Sadece id içeren nesne
        categories: newBook.categories.map((id) => ({ id })), // Her kategori için { id: kategoriId } şeklinde dizi
      };

      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/api/v1/books",
        bookToSend
      );
      handleAlert("Book Added");
      setNewBook(initialBook);
      fetchBooks(); // POST işleminden sonra listeyi güncelle
    } catch (error) {
      console.error(
        "Kitap eklenirken hata oluştu:",
        error.response?.data || error.message
      );
    }
  };

  const handleAlert = (alertM) => {
    setAlertMessage(alertM);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const handleBookDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/books/${id}`
      );
      handleAlert(response.data);
      fetchBooks(); // Delete işleminden sonra listeyi güncelle
    } catch (error) {
      console.error("Kitap silinirken hata oluştu:", error);
    }
  };

  const handleUpdateForm = (book) => {
    setUpdateBook(book);
  };

  const handleUpdateBook = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/v1/books/${updateBook.id}`,
        updateBook
      );
      setUpdateBook(initialBook);
      handleAlert("Book Updated");
      fetchBooks(); // Güncellemeden sonra listeyi güncelle
    } catch (error) {
      console.error("Kitap güncellenirken hata oluştu:", error);
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
        New Book
      </Typography>
      <div className="newDoctor">
        {/* TextField ile render edilen alanlar */}
        {["name", "publicationYear", "stock"].map((key) => (
          <TextField
            key={key}
            autoComplete="off"
            type="text"
            label={key}
            variant="standard"
            value={newBook[key]}
            onChange={(e) =>
              setNewBook((prev) => ({ ...prev, [key]: e.target.value }))
            }
            sx={{
              width: 182, // Genişlik
              "& .MuiInputBase-root": { height: 32 }, // Yükseklik
              input: { color: "#4A3627" }, // Koyu kahve yazı
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" }, // Orta kahve alt çizgi
              "& .MuiInputLabel-root": { color: "#8B6F47" }, // Orta kahve label
            }}
          />
        ))}

        {/* Author için select */}
        <div key="author-select">
          <TextField
            select
            label="Author"
            value={newBook.author.id || ""}
            onChange={(e) =>
              setNewBook((prev) => ({
                ...prev,
                author: { id: e.target.value },
              }))
            }
            variant="standard"
            sx={{
              width: 182, // TextField ile aynı genişlik
              "& .MuiInputBase-root": { height: 32 }, // TextField ile aynı yükseklik
              "& .MuiInputBase-input": { color: "#4A3627" }, // Koyu kahve yazı
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" }, // Orta kahve alt çizgi
              "& .MuiInputLabel-root": { color: "#8B6F47" }, // Orta kahve label
            }}
          >
            {authors?.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* Publisher için select */}
        <div key="publisher-select">
          <TextField
            select
            label="Publisher"
            value={newBook.publisher.id || ""}
            onChange={(e) =>
              setNewBook((prev) => ({
                ...prev,
                publisher: { id: e.target.value },
              }))
            }
            variant="standard"
            sx={{
              width: 182,
              "& .MuiInputBase-root": { height: 32 },
              "& .MuiInputBase-input": { color: "#4A3627" },
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
              "& .MuiInputLabel-root": { color: "#8B6F47" },
            }}
          >
            {publishers?.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* Categories için select */}
        <div key="categories-select">
          <TextField
            select
            label="Categories"
            value={newBook.categories}
            onChange={(e) =>
              setNewBook((prev) => ({
                ...prev,
                categories: e.target.value,
              }))
            }
            variant="standard"
            SelectProps={{
              multiple: true,
            }}
            sx={{
              width: 182,
              "& .MuiInputBase-root": { height: 32 },
              "& .MuiInputBase-input": { color: "#4A3627" },
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
              "& .MuiInputLabel-root": { color: "#8B6F47" },
            }}
          >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Button
          variant="contained"
          onClick={handleBookPost}
          sx={{
            bgcolor: "#4A3627", // Koyu kahve buton
            color: "#F5F5DC", // Bej yazı
            "&:hover": { bgcolor: "#6B4E31" }, // Hover için açık kahve
          }}
        >
          Add New Book
        </Button>
      </div>

      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, mt: 4, color: "#4A3627" }}>
        Update Book
      </Typography>

      <div className="newDoctor">
        {/* TextField'lar: name, publicationYear, stock */}
        <TextField
          autoComplete="off"
          type="text"
          label="name"
          variant="standard"
          value={updateBook.name || ""}
          onChange={(e) =>
            setUpdateBook((prev) => ({ ...prev, name: e.target.value }))
          }
          sx={{
            width: 182,
            "& .MuiInputBase-root": { height: 32 },
            input: { color: "#4A3627" },
            "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
            "& .MuiInputLabel-root": { color: "#8B6F47" },
          }}
        />
        <TextField
          autoComplete="off"
          type="text"
          label="publicationYear"
          variant="standard"
          value={updateBook.publicationYear}
          onChange={(e) =>
            setUpdateBook((prev) => ({
              ...prev,
              publicationYear: e.target.value,
            }))
          }
          sx={{
            width: 182,
            "& .MuiInputBase-root": { height: 32 },
            input: { color: "#4A3627" },
            "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
            "& .MuiInputLabel-root": { color: "#8B6F47" },
          }}
        />
        <TextField
          autoComplete="off"
          type="text"
          label="stock"
          variant="standard"
          value={updateBook.stock || ""}
          onChange={(e) =>
            setUpdateBook((prev) => ({ ...prev, stock: e.target.value }))
          }
          sx={{
            width: 182,
            "& .MuiInputBase-root": { height: 32 },
            input: { color: "#4A3627" },
            "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
            "& .MuiInputLabel-root": { color: "#8B6F47" },
          }}
        />

        {/* Update: Author select */}
        <div key="update-author-select">
          <TextField
            select
            label="Author"
            value={updateBook.author?.id || ""}
            onChange={(e) =>
              setUpdateBook((prev) => ({
                ...prev,
                author: { id: e.target.value },
              }))
            }
            variant="standard"
            sx={{
              width: 182,
              "& .MuiInputBase-root": { height: 32 },
              "& .MuiInputBase-input": { color: "#4A3627" },
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
              "& .MuiInputLabel-root": { color: "#8B6F47" },
            }}
          >
            {authors?.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* Update: Publisher select */}
        <div key="update-publisher-select">
          <TextField
            select
            label="Publisher"
            value={updateBook.publisher?.id || ""}
            onChange={(e) =>
              setUpdateBook((prev) => ({
                ...prev,
                publisher: { id: e.target.value },
              }))
            }
            variant="standard"
            sx={{
              width: 182,
              "& .MuiInputBase-root": { height: 32 },
              "& .MuiInputBase-input": { color: "#4A3627" },
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
              "& .MuiInputLabel-root": { color: "#8B6F47" },
            }}
          >
            {publishers?.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        {/* Update: Categories select */}
        <div key="update-categories-select">
          <TextField
            select
            label="Categories"
            value={
              updateBook.categories && updateBook.categories.length > 0
                ? updateBook.categories.map((cat) => cat.id)
                : []
            }
            onChange={(e) =>
              setUpdateBook((prev) => ({
                ...prev,
                categories: e.target.value.map((val) => ({ id: val })),
              }))
            }
            variant="standard"
            SelectProps={{
              multiple: true,
            }}
            sx={{
              width: 182,
              "& .MuiInputBase-root": { height: 32 },
              "& .MuiInputBase-input": { color: "#4A3627" },
              "& .MuiInput-underline:before": { borderBottomColor: "#8B6F47" },
              "& .MuiInputLabel-root": { color: "#8B6F47" },
            }}
          >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <Button
          variant="contained"
          onClick={handleUpdateBook}
          sx={{
            bgcolor: "#4A3627",
            color: "#F5F5DC",
            "&:hover": { bgcolor: "#6B4E31" },
          }}
        >
          Update Book
        </Button>
      </div>

      <Typography variant="h1" sx={{ textAlign: "center", mb: 3, mt: 4, color: "#4A3627" }}>
        Books
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#F5F5DC" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Name</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>
                Publication Year
              </TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Stock</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Author</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Publisher</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Categories</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Delete</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.map((book) => (
              <TableRow
                key={book.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, bgcolor: "#FFF5E1" }}
              >
                <TableCell align="center" component="th" scope="row" sx={{ color: "#4A3627" }}>
                  {book.name}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {book.publicationYear}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {book.stock}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {book.author?.name}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {book.publisher?.name}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {book.categories?.map((cat) => cat.name).join(", ")}
                </TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handleBookDelete(book.id)}
                    sx={{ color: "#4A3627" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <ArrowUpwardIcon
                    className="updateDoctor"
                    onClick={() => handleUpdateForm(book)}
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

export default Book;