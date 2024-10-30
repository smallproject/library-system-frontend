import React from 'react';
import {Route, Routes} from "react-router-dom";
import GetEndpointCard from "../components/GetEndpoint/GetEndpointCard.jsx";
import GetAllEndpointTiles from "../components/GetAllEndpoint/GetAllEndpointTiles.jsx";

function Main() {
    return (
        <section>
            <div className="main-content">
                <div>
                    <h2>Welcome to the Library System</h2>
                    <p>Explore our collection of books and resources to enhance your knowledge.</p>
                </div>
                <div className={"main"}></div>
                <div className={"section"}>
                    <h2>SECTION</h2>
                    <Routes>
                        <Route path={"authors"} element={<GetAllEndpointTiles title={"Authors"} url={`http://localhost:8080/api/v1/authors/`}/>}/>
                        <Route path={"authors/:id"} element={<GetEndpointCard title={"GetBy-author"} url={`http://localhost:8080/api/v1/authors/`}/>}/>
                        <Route path={"books"} element={<GetAllEndpointTiles title={"Books"} url={`http://localhost:8080/api/v1/books/`}/>}/>
                        <Route path={"books/:id"} element={<GetEndpointCard title={"GetBy-books"} url={`http://localhost:8080/api/v1/books/`}/>}/>
                        <Route path={"inventories"} element={<GetAllEndpointTiles title={"inventories"} url={`http://localhost:8080/api/v1/inventories/`}/>}/>
                        <Route path={"inventories/:id"} element={<GetEndpointCard title={"GetBy-inventories"} url={`http://localhost:8080/api/v1/inventories/`}/>}/>
                        <Route path={"userreviews"} element={<GetAllEndpointTiles title={"userreviews"} url={`http://localhost:8080/api/v1/userreviews/`}/>}/>
                        <Route path={"userreviews/:id"} element={<GetEndpointCard title={"GetBy-userreviews"} url={`http://localhost:8080/api/v1/userreviews/`}/>}/>
                    </Routes>
                </div>
            </div>
        </section>
    );
}

export default Main;