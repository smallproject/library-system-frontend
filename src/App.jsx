import './App.css'
import {Route, Routes} from "react-router-dom";
import React from "react";
import AuthorMain from "./models/Author/AuthorMain.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./App.css"
import Login from "./pages/Login-Auth/Login-Auth.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import GetEndpointCard from "./components/GetEndpoint/GetEndpointCard.jsx";
import GetAllEndpointTiles from "./components/GetAllEndpoint/GetAllEndpointTiles.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Catalog from "./pages/Catalog.jsx";
import Contact from "./pages/Contact.jsx";

function App() {

  return (
    <>
        <div className={"App"}>
            <Navbar/>

            <div className={"main-content"}>
                <Routes>
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    {/*<Route path="/contact" element={<Contact />} />*/}
                    {/*<Route path="/contact" element={<Contact />} />*/}
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default App
