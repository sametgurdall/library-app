import { useState } from 'react'
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import './App.css'
import Home from './pages/Home/Home';
import Authors from './pages/Authors/Authors';
import Publisher from './pages/Publisher/Publisher';
import Category from './pages/Category/Category';
import Book from './pages/Book/Book';
import Barrow from './pages/Barrow/Barrow';


function App() {
  

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/authors">
          <Authors />
        </Route>
        <Route path="/publisher">
          <Publisher />
        </Route>
        <Route path="/category">
          <Category />
        </Route>
        <Route path="/book">
          <Book />
        </Route>
        <Route path="/barrow">
          <Barrow />
        </Route>
      </Switch>
    </>
  )
}

export default App
