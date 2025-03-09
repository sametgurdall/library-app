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
import "./Category.css";

// Yeni kategori için başlangıç değeri
const initialCategory = {
  name: "",
  description: "",
};

function Category() {
  // State yönetimi
  const [newCategory, setNewCategory] = useState(initialCategory);
  const [updateCategory, setUpdateCategory] = useState(initialCategory);
  const [categories, setCategories] = useState(null);
  const [update, setUpdate] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Kategorileri API'den çekme
  useEffect(() => {
    const request = async () => {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/categories");
      setCategories(res.data);
      setUpdate(true);
    };
    request();
  }, [update]);

  // Yeni kategori ekleme işlemi
  const handleCategoryPost = async () => {
    await axios.post(import.meta.env.VITE_BASE_URL + "/api/v1/categories", newCategory);
    setUpdate(false);
    setNewCategory(initialCategory);
    handleAlert("Category Added");
  };

  // Bildirim mesajı ayarlama
  const handleAlert = (alertM) => {
    setAlertMessage(alertM);
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  // Kategori silme işlemi
  const handleCategoryDelete = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/api/v1/categories/${id}`
    );
    handleAlert(response.data);
    setUpdate(false);
  };

  // Güncelleme formunu doldurma
  const handleUpdateForm = (category) => {
    setUpdateCategory(category);
  };

  // Kategori güncelleme işlemi
  const handleUpdateCategory = async () => {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}/api/v1/categories/${updateCategory.id}`,
      updateCategory
    );
    setUpdateCategory(initialCategory);
    handleAlert("Category Updated");
    setUpdate(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#E8D5B9", // Authors ve Publisher ile uyumlu açık bej-kahve
        minHeight: "100vh",
        padding: "20px",
        color: "#4A3627", // Navbar ile uyumlu koyu kahve yazı
      }}
    >
      {/* Yeni kategori ekleme bölümü */}
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, color: "#4A3627" }}>
        New Category
      </Typography>
      <div
        className="newCategory"
        style={{
          display: "flex",
          flexWrap: "wrap", // Küçük ekranlarda öğeler alt alta gelir
          gap: "16px", // Öğeler arasında boşluk
          justifyContent: "center", // Öğeleri ortalar
          marginBottom: "20px",
        }}
      >
        {Object.keys(initialCategory).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            label={key === "name" ? "Name" : "Description"}
            variant="standard"
            value={newCategory[key]}
            onChange={(e) =>
              setNewCategory((prev) => ({ ...prev, [key]: e.target.value }))
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
        <Button
          variant="contained"
          onClick={handleCategoryPost}
          sx={{
            flex: "1 1 200px", // Buton da esnek genişlikte
            maxWidth: "100%",
            bgcolor: "#4A3627", // Navbar ile uyumlu koyu kahve
            color: "#F5F5DC", // Bej yazı
            "&:hover": { bgcolor: "#6B4E31" }, // Biraz daha açık kahve hover
          }}
        >
          Add New Category
        </Button>
      </div>

      {/* Kategori güncelleme bölümü */}
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3, mt: 4, color: "#4A3627" }}>
        Update Category
      </Typography>
      <div
        className="newCategory"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {Object.keys(initialCategory).map((key) => (
          <TextField
            key={key}
            id="standard-basic"
            label={key === "name" ? "Name" : "Description"}
            variant="standard"
            value={updateCategory[key]}
            onChange={(e) =>
              setUpdateCategory((prev) => ({ ...prev, [key]: e.target.value }))
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
          onClick={handleUpdateCategory}
          sx={{
            flex: "1 1 200px",
            maxWidth: "100%",
            bgcolor: "#4A3627", // Navbar ile uyumlu koyu kahve
            color: "#F5F5DC",
            "&:hover": { bgcolor: "#6B4E31" },
          }}
        >
          Update Category
        </Button>
      </div>

      {/* Kategori listesi */}
      <Typography variant="h1" sx={{ textAlign: "center", mb: 3, mt: 4, color: "#4A3627" }}>
        Categories
      </Typography>
      <TableContainer component={Paper} sx={{ bgcolor: "#F5F5DC" }}> {/* Bej, açık ton */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Name</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Description</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Delete</TableCell>
              <TableCell align="center" sx={{ color: "#4A3627" }}>Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category) => (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 }, bgcolor: "#FFF5E1" }} // Daha açık bej
              >
                <TableCell align="center" component="th" scope="row" sx={{ color: "#4A3627" }}>
                  {category.name}
                </TableCell>
                <TableCell align="center" sx={{ color: "#4A3627" }}>
                  {category.description}
                </TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handleCategoryDelete(category.id)}
                    sx={{ color: "#4A3627" }}
                  />
                </TableCell>
                <TableCell align="center">
                  <ArrowUpwardIcon
                    className="updateCategory"
                    onClick={() => handleUpdateForm(category)}
                    sx={{ color: "#4A3627" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bildirim mesajı */}
      {alert && (
        <Typography variant="h6" sx={{ color: "#4A3627", textAlign: "center", mt: 2 }}>
          {alertMessage}
        </Typography>
      )}
    </div>
  );
}

export default Category;