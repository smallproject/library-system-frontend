import "./AuthorMain.css"

import React from 'react';
import {Route, Routes} from "react-router-dom";
import GetEndpointCard from "../../components/GetEndpoint/GetEndpointCard.jsx";
import GetAllEndpointTiles from "../../components/GetAllEndpoint/GetAllEndpointTiles.jsx";

function AuthorMain() {
    return (
        <>
            <h1>Author Main</h1>
            <Routes>
                <Route path={"/1"} element={<GetEndpointCard title={"GetBy"} url={"http://localhost:8080/api/v1/authors/1"}/>}/>
                <Route path={"/2"} element={<GetAllEndpointTiles title={"GetAll"} url={"http://localhost:8080/api/v1/authors"}/>}/>
            </Routes>
        </>
    );
}

export default AuthorMain;