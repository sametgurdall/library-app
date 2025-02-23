// import { Button, Typography } from "@mui/material";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import "./Book.css";
// import { Phone } from "@mui/icons-material";

// const initialBook = {
//   name: "",
//   publicationYear: "",
//   stock: "",
//   author: {
//     // id: "",
//     //   name: "",
//     //   birthDate: "",
//     //   country: ""
//   },
//   publisher: {
    
//   },
//   categories: 
//     {
      
//     },
  
// };

// function Book() {
//   const [newBook, setNewBook] = useState(initialBook);
//   const [updateBook, setUpdateBook] = useState(initialBook);
//   const [books, setbooks] = useState(null);
//   const [authors, setAuthors] = useState(null);
//   const [publishers, setPublishers] = useState(null);
//   const [categories, setCategories] =useState(null);
//   const [update, setUpdate] = useState(false);
//   const [alert, setAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");

//   useEffect(() => {
//     const bookRequest = async () => {
//       const res = await axios.get("http://localhost:8080/api/v1/books");
//       setbooks(res.data);
//       setUpdate(true);
//     };
//     const authorRequest = async () => {
//       const res = await axios.get("http://localhost:8080/api/v1/authors");
//       setAuthors(res.data);
//     };
//     const publisherRequest = async () => {
//       const res = await axios.get("http://localhost:8080/api/v1/publishers");
//       setPublishers(res.data);
//     };
//     const categoriesRequest = async () => {
//       const res = await axios.get("http://localhost:8080/api/v1/categories");
//       setCategories(res.data);
//     };
//     bookRequest();
//     authorRequest();
//     publisherRequest();
//     categoriesRequest();
//     }, [update]);

//   const handleBookPost = async () => {
//     axios.post("http://localhost:8080/api/v1/books", newBook);
//     setUpdate(false);
//     setNewBook(initialBook);
//     handleAlert("Book Added");
//   };

//   const handleAlert = (alertM) => {
//     setAlertMessage(alertM);
//     setAlert(true);
//     setTimeout(() => {
//       setAlert(false);
//     }, 3000);
//   };

//   const handleBookDelete = async (id) => {
//     const response = await axios.delete(
//       `http://localhost:8080/api/v1/books${id}`
//     );
//     handleAlert(response.data);
//     setUpdate(false);
//   };

//   const handleUpdateForm = (book) => {
//     setUpdateBook(book);
//   };

//   const handleUpdateBook = async () => {
//     const response = await axios.put(
//       `http://localhost:8080/api/v1/books/${updateBook.id}`,
//       updateBook
//     );
//     setUpdateBook(initialBook);
//     handleAlert("Book Updated");
//     setUpdate(false);
//   };
//   return (
//     <div>
//       <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
//         New Book
//       </Typography>
//       <div className="newDoctor">
//       {Object.keys(initialBook).map((key) => {
        
//           if (key !== "author" && key !== "publisher" && key !== "categories") {
//             return (
//               <TextField
//                 key={key}
//                 autoComplete="off"
//                 type={key === "dateOfBirth" ? "date" : "text"}
//                 id="standard-basic"
//                 label={key === "dateOfBirth" ? " " : key}
//                 variant="standard"
//                 value={newBook[key]}
//                 onChange={(e) =>
//                   setNewBook((prev) => ({ ...prev, [key]: e.target.value }))
//                 }
//               />
//             );
//           } else {
//             return (
//               // <div key={key}>
//               //   <InputLabel id="demo-simple-select-label">Author</InputLabel>
//               //   <Select
//               //     labelId="demo-simple-select-label"
//               //     id="demo-simple-select"
//               //     value={newBook.author.id}
//               //     name={key}
//               //     label="Author"
//               //     onChange={(e) => {
//               //       setNewBook((prev) => ({
//               //         ...prev,
//               //         [key]: { id: e.target.value },
//               //       }
//               //     ));
//               //     }
//               //   }
//               //   >
//               //     {authors?.map((author) => (
//               //       <MenuItem key={author.id} value={author.id}>
//               //         {author.name}
//               //       </MenuItem>
//               //     ))}
//               //   </Select>
//               // </div>

//               <>
//     {/* Author için select */}
//     <div key="author">
//       <InputLabel id="select-label-author">Author</InputLabel>
//       <Select
//         labelId="select-label-author"
//         id="select-author"
//         value={newBook.author.id}
//         name="author"
//         label="Author"
//         onChange={(e) => {
//           setNewBook((prev) => ({
//             ...prev,
//             author: { id: e.target.value },
//           }));
//         }}
//       >
//         {authors?.map((author) => (
//           <MenuItem key={author.id} value={author.id}>
//             {author.name}
//           </MenuItem>
//         ))}
//       </Select>
//     </div>

//     {/* Publisher için select */}
//     <div key="publisher">
//       <InputLabel id="select-label-publisher">Publisher</InputLabel>
//       <Select
//         labelId="select-label-publisher"
//         id="select-publisher"
//         value={newBook.publisher.id}
//         name="publisher"
//         label="Publisher"
//         onChange={(e) => {
//           setNewBook((prev) => ({
//             ...prev,
//             publisher: { id: e.target.value },
//           }));
//         }}
//       >
//         {publishers?.map((publisher) => (
//           <MenuItem key={publisher.id} value={publisher.id}>
//             {publisher.name}
//           </MenuItem>
//         ))}
//       </Select>
//     </div>

//     {/* Categories için select */}
//     <div key="categories">
//       <InputLabel id="select-label-categories">Categories</InputLabel>
//       <Select
//         labelId="select-label-categories"
//         id="select-categories"
//         value={newBook.categories} 
//         name="categories"
//         label="Categories"
//         multiple
//         onChange={(e) => {
//           setNewBook((prev) => ({
//             ...prev,
//             categories: e.target.value, // Çoklu seçimde value bir dizi olur
//           }));
//         }}
//       >
//         {categories?.map((category) => (
//           <MenuItem key={category.id} value={category.id}>
//             {category.name}
//           </MenuItem>
//         ))}
//       </Select>
//     </div>
//   </>
//             );
//           }
//         }
//         )}

//         <Button variant="contained" onClick={handleBookPost}>
//           Add New Book
//         </Button>
//       </div>

//       <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
//         Update Book
//       </Typography>

//       <div className="newDoctor">
//         {Object.keys(initialBook).map((key) => (
//           <TextField
//             key={key}
//             id="standard-basic"
//             label={key}
//             variant="standard"
//             value={updateBook[key]}
//             onChange={(e) =>
//               setUpdateBook((prev) => ({ ...prev, [key]: e.target.value }))
//             }
//           />
//         ))}
//         <Button variant="contained" onClick={handleUpdateBook}>
//           Update Book
//         </Button>
//       </div>

//       <Typography variant="h1" style={{ textAlign: "center", margin: "20px" }}>
//         Book
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               {Object.keys(initialBook).map((key) => {
//                 if (key === "author") {
//                   return Object.keys(initialBook.author).map(
//                     (authorKey) => (
//                       <TableCell key={key}>{authorKey}</TableCell>
//                     )
//                   );
//                 }
//                 return <TableCell key={key}>{key}</TableCell>;
//               })}
//               <TableCell align="center">Delete</TableCell>
//               <TableCell align="center">Update</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {books?.map((book) => (
//               <TableRow
//                 key={book.id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {book.name}
//                 </TableCell>
//                 <TableCell align="center">{book?.publicationYear}</TableCell>
//                 <TableCell align="center">{book?.stock}</TableCell>
//                 <TableCell align="center">{book.address}</TableCell>
                
//                 <TableCell align="center">
//                   <DeleteForeverIcon
//                     className="deleteIcon"
//                     onClick={() => handleBookDelete(book.id)}
//                   />
//                 </TableCell>
//                 <TableCell align="center">
//                   <ArrowUpwardIcon
//                     className="updateDoctor"
//                     onClick={() => handleUpdateForm(book)}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {alert && <h1>{alertMessage}</h1>}
//     </div>
//   )
// }

// export default Book





// import { Button, Typography } from "@mui/material";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
// import "./Book.css";

// const initialBook = {
//   name: "",
//   publicationYear: "",
//   stock: "",
//   author: {},      // Başlangıçta boş nesne
//   publisher: {},   // Başlangıçta boş nesne
//   categories: []   // Çoklu seçim için boş dizi
// };

// function Book() {
//   const [newBook, setNewBook] = useState(initialBook);
//   const [updateBook, setUpdateBook] = useState(initialBook);
//   const [books, setBooks] = useState(null);
//   const [authors, setAuthors] = useState(null);
//   const [publishers, setPublishers] = useState(null);
//   const [categories, setCategories] = useState(null);
//   const [alert, setAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");

//   // Kitapları çekmek için fonksiyon
//   const fetchBooks = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/v1/books");
//       setBooks(res.data);
//     } catch (error) {
//       console.error("Kitapları çekerken hata oluştu:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [booksRes, authorsRes, publishersRes, categoriesRes] =
//           await Promise.all([
//             axios.get("http://localhost:8080/api/v1/books"),
//             axios.get("http://localhost:8080/api/v1/authors"),
//             axios.get("http://localhost:8080/api/v1/publishers"),
//             axios.get("http://localhost:8080/api/v1/categories")
//           ]);
//         setBooks(booksRes.data);
//         setAuthors(authorsRes.data);
//         setPublishers(publishersRes.data);
//         setCategories(categoriesRes.data);
//       } catch (error) {
//         console.error("Veriler çekilirken hata oluştu:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleBookPost = async () => {
//     try {
//       await axios.post("http://localhost:8080/api/v1/books", newBook);
//       handleAlert("Book Added");
//       setNewBook(initialBook);
//       console.log(newBook);
//       fetchBooks(); // POST işleminden sonra listeyi güncelle
//     } catch (error) {
//       console.error("Kitap eklenirken hata oluştu:", error);
//     }
//   };

//   const handleAlert = (alertM) => {
//     setAlertMessage(alertM);
//     setAlert(true);
//     setTimeout(() => {
//       setAlert(false);
//     }, 3000);
//   };

//   const handleBookDelete = async (id) => {
//     try {
//       const response = await axios.delete(
//         `http://localhost:8080/api/v1/books/${id}` 
//       );
//       handleAlert(response.data);
//       fetchBooks(); // Delete işleminden sonra listeyi güncelle
//     } catch (error) {
//       console.error("Kitap silinirken hata oluştu:", error);
//     }
//   };

//   const handleUpdateForm = (book) => {
//     setUpdateBook(book);
//   };

//   const handleUpdateBook = async () => {
//     try {
//       await axios.put(
//         `http://localhost:8080/api/v1/books/${updateBook.id}`,
//         updateBook
//       );
//       setUpdateBook(initialBook);
//       handleAlert("Book Updated");
//       fetchBooks(); // Güncellemeden sonra listeyi güncelle
//     } catch (error) {
//       console.error("Kitap güncellenirken hata oluştu:", error);
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
//         New Book
//       </Typography>
//       <div className="newDoctor">
//         {/* Sadece TextField ile render edilen alanlar */}
//         {["name", "publicationYear", "stock"].map((key) => (
//           <TextField
//             key={key}
//             autoComplete="off"
//             type="text"
//             label={key}
//             variant="standard"
//             value={newBook[key]}
//             onChange={(e) =>
//               setNewBook((prev) => ({ ...prev, [key]: e.target.value }))
//             }
//           />
//         ))}

//         {/* Author için select */}
//         <div key="author-select">
//           <InputLabel id="select-label-author">Author</InputLabel>
//           <Select
//             labelId="select-label-author"
//             id="select-author"
//             value={newBook.author.id || ""}
//             name="author"
//             label="Author"
//             onChange={(e) => {
//               setNewBook((prev) => ({
//                 ...prev,
//                 author: { id: e.target.value },
//               }));
//             }}
//           >
//             {authors?.map((author) => (
//               <MenuItem key={author.id} value={author.id}>
//                 {author.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>

//         {/* Publisher için select */}
//         <div key="publisher-select">
//           <InputLabel id="select-label-publisher">Publisher</InputLabel>
//           <Select
//             labelId="select-label-publisher"
//             id="select-publisher"
//             value={newBook.publisher.id || ""}
//             name="publisher"
//             label="Publisher"
//             onChange={(e) => {
//               setNewBook((prev) => ({
//                 ...prev,
//                 publisher: { id: e.target.value },
//               }));
//             }}
//           >
//             {publishers?.map((publisher) => (
//               <MenuItem key={publisher.id} value={publisher.id}>
//                 {publisher.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>

//         {/* Categories için select */}
//         <div key="categories-select">
//           <InputLabel id="select-label-categories">Categories</InputLabel>
//           <Select
//             labelId="select-label-categories"
//             id="select-categories"
//             value={newBook.categories}
//             name="categories"
//             label="Categories"
//             multiple
//             onChange={(e) => {
//               setNewBook((prev) => ({
//                 ...prev,
//                 categories: e.target.value, // Çoklu seçimde value bir dizi olmalı
//               }));
//             }}
//           >
//             {categories?.map((category) => (
//               <MenuItem key={category.id} value={category.id}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>

//         <Button variant="contained" onClick={handleBookPost}>
//           Add New Book
//         </Button>
//       </div>

//       <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
//         Update Book
//       </Typography>

//       <div className="newDoctor">
//         {/* TextField'lar: name, publicationYear, stock */}
//         <TextField
//           autoComplete="off"
//           type="text"
//           label="name"
//           variant="standard"
//           value={updateBook.name || ""}
//           onChange={(e) =>
//             setUpdateBook((prev) => ({ ...prev, name: e.target.value }))
//           }
//         />
//         <TextField
//           autoComplete="off"
//           type="text"
//           label="publicationYear"
//           variant="standard"
//           value={updateBook.publicationYear}
//           onChange={(e) =>
//             setUpdateBook((prev) => ({
//               ...prev,
//               publicationYear: e.target.value,
//             }))
//           }
//         />
//         <TextField
//           autoComplete="off"
//           type="text"
//           label="stock"
//           variant="standard"
//           value={updateBook.stock || ""}
//           onChange={(e) =>
//             setUpdateBook((prev) => ({ ...prev, stock: e.target.value }))
//           }
//         />

//         {/* Update: Author select */}
//         <div key="update-author-select">
//           <InputLabel id="update-select-label-author">Author</InputLabel>
//           <Select
//             labelId="update-select-label-author"
//             id="update-select-author"
//             value={updateBook.author?.id || ""}
//             name="author"
//             label="Author"
//             onChange={(e) => {
//               setUpdateBook((prev) => ({
//                 ...prev,
//                 author: { id: e.target.value },
//               }));
//             }}
//           >
//             {authors?.map((author) => (
//               <MenuItem key={author.id} value={author.id}>
//                 {author.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>

//         {/* Update: Publisher select */}
//         <div key="update-publisher-select">
//           <InputLabel id="update-select-label-publisher">Publisher</InputLabel>
//           <Select
//             labelId="update-select-label-publisher"
//             id="update-select-publisher"
//             value={updateBook.publisher?.id || ""}
//             name="publisher"
//             label="Publisher"
//             onChange={(e) => {
//               setUpdateBook((prev) => ({
//                 ...prev,
//                 publisher: { id: e.target.value },
//               }));
//             }}
//           >
//             {publishers?.map((publisher) => (
//               <MenuItem key={publisher.id} value={publisher.id}>
//                 {publisher.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>

//         {/* Update: Categories select */}
//         <div key="update-categories-select">
//           <InputLabel id="update-select-label-categories">Categories</InputLabel>
//           <Select
//             labelId="update-select-label-categories"
//             id="update-select-categories"
//             value={
//               updateBook.categories && updateBook.categories.length > 0
//                 ? updateBook.categories.map((cat) => cat.id)
//                 : []
//             }
//             name="categories"
//             label="Categories"
//             multiple
//             onChange={(e) => {
//               setUpdateBook((prev) => ({
//                 ...prev,
//                 categories: e.target.value.map((val) => ({ id: val })),
//               }));
//             }}
//           >
//             {categories?.map((category) => (
//               <MenuItem key={category.id} value={category.id}>
//                 {category.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </div>

//         <Button variant="contained" onClick={handleUpdateBook}>
//           Update Book
//         </Button>
//       </div>

//       <Typography variant="h1" style={{ textAlign: "center", margin: "20px" }}>
//         Book
//       </Typography>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               {Object.keys(initialBook).map((key) => {
//                 if (key === "author") {
//                   return Object.keys(initialBook.author).map((authorKey) => (
//                     <TableCell key={`author-${authorKey}`}>
//                       {authorKey}
//                     </TableCell>
//                   ));
//                 }
//                 return <TableCell key={key}>{key}</TableCell>;
//               })}
//               <TableCell align="center">Delete</TableCell>
//               <TableCell align="center">Update</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {books?.map((book) => (
//               <TableRow
//                 key={book.id}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {book.name}
//                 </TableCell>
//                 <TableCell align="center">{book.publicationYear}</TableCell>
//                 <TableCell align="center">{book.stock}</TableCell>
                
//                 <TableCell align="center">
//                   <DeleteForeverIcon
//                     className="deleteIcon"
//                     onClick={() => handleBookDelete(book.id)}
//                   />
//                 </TableCell>
//                 <TableCell align="center">
//                   <ArrowUpwardIcon
//                     className="updateDoctor"
//                     onClick={() => handleUpdateForm(book)}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       {alert && <h1>{alertMessage}</h1>}
//     </div>
//   );
// }

// export default Book;

// deneme
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./Book.css";

const initialBook = {
  name: "",
  publicationYear: "",
  stock: "",
  author: {},      // Başlangıçta boş nesne
  publisher: {},   // Başlangıçta boş nesne
  categories: []   // Çoklu seçim için boş dizi
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
            axios.get(import.meta.env.VITE_BASE_URL + "/api/v1/categories")
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
        categories: newBook.categories.map(id => ({ id })) // Her kategori için { id: kategoriId } şeklinde dizi
      };

      const response = await axios.post(import.meta.env.VITE_BASE_URL + "/api/v1/books", bookToSend);
      handleAlert("Book Added");
      setNewBook(initialBook);
      fetchBooks(); // POST işleminden sonra listeyi güncelle
    } catch (error) {
      console.error("Kitap eklenirken hata oluştu:", error.response?.data || error.message);
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
        `${import.meta.env.VITE_BASE_URL }/api/v1/books/${id}` 
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
        `${import.meta.env.VITE_BASE_URL }/api/v1/books/${updateBook.id}`,
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
    <div>
      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
        New Book
      </Typography>
      <div className="newDoctor">
        {/* Sadece TextField ile render edilen alanlar */}
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
          />
        ))}

        {/* Author için select */}
        <div key="author-select">
          <InputLabel id="select-label-author">Author</InputLabel>
          <Select
            labelId="select-label-author"
            id="select-author"
            value={newBook.author.id || ""}
            name="author"
            label="Author"
            onChange={(e) => {
              setNewBook((prev) => ({
                ...prev,
                author: { id: e.target.value },
              }));
            }}
          >
            {authors?.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Publisher için select */}
        <div key="publisher-select">
          <InputLabel id="select-label-publisher">Publisher</InputLabel>
          <Select
            labelId="select-label-publisher"
            id="select-publisher"
            value={newBook.publisher.id || ""}
            name="publisher"
            label="Publisher"
            onChange={(e) => {
              setNewBook((prev) => ({
                ...prev,
                publisher: { id: e.target.value },
              }));
            }}
          >
            {publishers?.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Categories için select */}
        <div key="categories-select">
          <InputLabel id="select-label-categories">Categories</InputLabel>
          <Select
            labelId="select-label-categories"
            id="select-categories"
            value={newBook.categories}
            name="categories"
            label="Categories"
            multiple
            onChange={(e) => {
              setNewBook((prev) => ({
                ...prev,
                categories: e.target.value, // Çoklu seçimde value bir dizi olmalı
              }));
            }}
          >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <Button variant="contained" onClick={handleBookPost}>
          Add New Book
        </Button>
      </div>

      <Typography variant="h4" style={{ textAlign: "center", margin: "20px" }}>
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
        />

        {/* Update: Author select */}
        <div key="update-author-select">
          <InputLabel id="update-select-label-author">Author</InputLabel>
          <Select
            labelId="update-select-label-author"
            id="update-select-author"
            value={updateBook.author?.id || ""}
            name="author"
            label="Author"
            onChange={(e) => {
              setUpdateBook((prev) => ({
                ...prev,
                author: { id: e.target.value },
              }));
            }}
          >
            {authors?.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Update: Publisher select */}
        <div key="update-publisher-select">
          <InputLabel id="update-select-label-publisher">Publisher</InputLabel>
          <Select
            labelId="update-select-label-publisher"
            id="update-select-publisher"
            value={updateBook.publisher?.id || ""}
            name="publisher"
            label="Publisher"
            onChange={(e) => {
              setUpdateBook((prev) => ({
                ...prev,
                publisher: { id: e.target.value },
              }));
            }}
          >
            {publishers?.map((publisher) => (
              <MenuItem key={publisher.id} value={publisher.id}>
                {publisher.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        {/* Update: Categories select */}
        <div key="update-categories-select">
          <InputLabel id="update-select-label-categories">Categories</InputLabel>
          <Select
            labelId="update-select-label-categories"
            id="update-select-categories"
            value={
              updateBook.categories && updateBook.categories.length > 0
                ? updateBook.categories.map((cat) => cat.id)
                : []
            }
            name="categories"
            label="Categories"
            multiple
            onChange={(e) => {
              setUpdateBook((prev) => ({
                ...prev,
                categories: e.target.value.map((val) => ({ id: val })),
              }));
            }}
          >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </div>

        <Button variant="contained" onClick={handleUpdateBook}>
          Update Book
        </Button>
      </div>

      <Typography variant="h1" style={{ textAlign: "center", margin: "20px" }}>
        Book
      </Typography>
      <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell align="center">Publication Year</TableCell>
        <TableCell align="center">Stock</TableCell>
        <TableCell align="center">Author</TableCell>
        <TableCell align="center">Publisher</TableCell>
        <TableCell align="center">Categories</TableCell>
        <TableCell align="center">Delete</TableCell>
        <TableCell align="center">Update</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {books?.map((book) => (
        <TableRow
          key={book.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {book.name}
          </TableCell>
          <TableCell align="center">{book.publicationYear}</TableCell>
          <TableCell align="center">{book.stock}</TableCell>
          <TableCell align="center">{book.author?.name}</TableCell> {/* Yazar adı */}
          <TableCell align="center">{book.publisher?.name}</TableCell> {/* Yayınevi adı */}
          <TableCell align="center">
            {book.categories?.map((cat) => cat.name).join(", ")} {/* Kategorileri birleştir */}
          </TableCell>
          <TableCell align="center">
            <DeleteForeverIcon
              className="deleteIcon"
              onClick={() => handleBookDelete(book.id)}
            />
          </TableCell>
          <TableCell align="center">
            <ArrowUpwardIcon
              className="updateDoctor"
              onClick={() => handleUpdateForm(book)}
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

export default Book;