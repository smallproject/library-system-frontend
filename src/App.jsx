import './App.css'
import GetEndpointCard from "./components/GetEndpoint/GetEndpointCard.jsx";
import {Route, Routes} from "react-router-dom";
import React from "react";
import AuthorMain from "./models/Author/AuthorMain.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./App.css"

function App() {

  return (
    <>
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <div className="App">
            <Navbar/>
            <div className="test">
                <h1>Home page</h1>
            </div>
            <div className={"main"}></div>
            <div className={"section"}>
                <h2>SECTION</h2>
                <Routes>
                    <Route path={"/authors/*"} element={<AuthorMain/>}/>
                    <Route path={"/books"}
                           element={<GetEndpointCard title={"BOOK"} url={"http://localhost:8080/api/v1/books/1"}/>}/>
                    <Route path={"/inventories"} element={<GetEndpointCard title={"INVENTORY"}
                                                                           url={"http://localhost:8080/api/v1/inventory/1"}/>}/>
                    <Route path={"/userreviews"} element={<GetEndpointCard title={"USER REVIEW"}
                                                                           url={"http://localhost:8080/api/v1/userreviews/1"}/>}/>
                </Routes>
            </div>
            <div className={"footer"}></div>
        </div>
    </>
  )
}

export default App
