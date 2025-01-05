import { useState } from "react";
import "./App.css";
import ListOfItems from "./components/ListOfItems";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddNewItem from "./components/AddNewItem";
import Home from "./components/Home";
import Tracker from "./components/Tracker";
import AddEntry from "./components/AddEntry";
import Login from "./components/Login";
import { Provider } from "react-redux";
import appStore from "./components/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <div className=" h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<ListOfItems />} />
            <Route path="/addNewItem" element={<AddNewItem />} />
            <Route path="/updateItem/:id" element={<AddNewItem />} />
            <Route path="/track" element={<Tracker />} />
            <Route path="/addEntry" element={<AddEntry />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
