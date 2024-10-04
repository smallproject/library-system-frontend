import './App.css'
import GetEndpointCard from "./components/GetEndpoint/GetEndpointCard.jsx";
import {Route, Routes} from "react-router-dom";
import React from "react";

function App() {

  return (
    <>
        {/* eslint-disable-next-line react/jsx-no-undef */}

        <Routes>
            <Route path={"/authors"} element={<GetEndpointCard title={"AUTHOR"} Url={"http://localhost:8080/api/v1/authors/1"}/>}/>
            <Route path={"/books"} element={<GetEndpointCard title={"BOOK"} Url={"http://localhost:8080/api/v1/books/1"}/>}/>
            <Route path={"/inventories"} element={<GetEndpointCard title={"INVENTORY"} Url={"http://localhost:8080/api/v1/inventory/1"}/>}/>
            <Route path={"/userreviews"} element={<GetEndpointCard title={"USER REVIEW"} Url={"http://localhost:8080/api/v1/userreviews/1"}/>}/>
        </Routes>
    </>
  )
}

export default App
