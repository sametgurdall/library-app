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
      `${import.meta.env.VITE_BASE_URL }/api/v1/categories/${id}`
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
      `${import.meta.env.VITE_BASE_URL }/api/v1/categories/${updateCategory.id}`,
      updateCategory
    );
    setUpdateCategory(initialCategory);
    handleAlert("Category Updated");
    setUpdate(false);
  };

  return (
    <div>
      {/* Yeni kategori ekleme bölümü */}
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        New Category
      </Typography>
      <div className="newPublisher">
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
          />
        ))}
        <Button variant="contained" onClick={handleCategoryPost}>
          Add New Category
        </Button>
      </div>

      {/* Kategori güncelleme bölümü */}
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        Update Category
      </Typography>
      <div className="newPublisher">
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
          />
        ))}
        <Button variant="contained" onClick={handleUpdateCategory}>
          Update Category
        </Button>
      </div>

      {/* Kategori listesi */}
      <Typography variant="h1" style={{ textAlign: "center", margin: "20px" }}>
        Category
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Update</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell align="center">{category.description}</TableCell>
                <TableCell align="center">
                  <DeleteForeverIcon
                    className="deleteIcon"
                    onClick={() => handleCategoryDelete(category.id)}
                  />
                </TableCell>
                <TableCell align="center">
                  <ArrowUpwardIcon
                    className="Publisher"
                    onClick={() => handleUpdateForm(category)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Bildirim mesajı */}
      {alert && <h1>{alertMessage}</h1>}
    </div>
  );
}

export default Category;
