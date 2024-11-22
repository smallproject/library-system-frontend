import './App.css'
import {Route, Routes} from "react-router-dom";
import Main from "./pages/Main/Main.jsx";

import Login from "./pages/Login-Auth/Login-Auth.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Catalog from "./pages/Catalog.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./components/Header/Header.jsx";

// books
import BookOverviewPage from "./pages/Book/Overview.jsx";
import BookCardViewPage from "./pages/Book/CardView.jsx";
import BookCardUpdatePage from "./pages/Book/CardUpdateView.jsx";
import BookCardCreatePage from "./pages/Book/CardCreateView.jsx";
// authors
import AuthorOverviewPage from "./pages/Author/Overview.jsx";
import AuthorCardViewPage from "./pages/Author/CardView.jsx";
import AuthorCardUpdatePage from "./pages/Author/CardUpdateView.jsx";
import AuthorCardCreatePage from "./pages/Author/CardCreateView.jsx";

import Profile from "./pages/Authentication/Profile.jsx";
import SignIn from "./pages/Authentication/SignIn.jsx";
import SignUp from "./pages/Authentication/SignUp.jsx";
import SearchBooks from "./pages/SearchBooks/SearchBooks.jsx";

function App() {

  return (
    // <>
        <div className={"container"}>
            <Header/>

            <main className={"container container-test"}>
                <Routes>
                    <Route path="/" element={<Main />}>
                    {/*    <Route path={"books"} element={<GetAllEndpointTiles title={"Authors"} url={`http://localhost:8080/api/v1/books`}/>}>*/}
                    {/*        <Route path={":id"} element={<GetEndpointCard title={"GetBy"} url={`/http://localhost:8080/api/v1/books`}/>}/>*/}
                    {/*    </Route>*/}
                    {/*    <Route path={"authors"} element={<GetAllEndpointTiles title={"Authors"} url={`http://localhost:8080/api/v1/authors`}/>}>*/}
                    {/*        <Route path={":id"} element={<GetEndpointCard title={"GetBy"} url={`http://localhost:8080/api/v1/authors/`}/>}/>*/}
                    {/*        <Route path={"update/:id"} element={<PostEndpointCard title={"GetBy"} url={`http://localhost:8080/api/v1/authors/`}/>}/>*/}

                    {/*    </Route>*/}
                    {/*    <Route path={"inventories"} element={<GetAllEndpointTiles title={"Authors"} url={`http://localhost:8080/api/v1/inventories`}/>}>*/}
                    {/*        <Route path={":id"} element={<GetEndpointCard title={"GetBy"} url={`http://localhost:8080/api/v1/inventories/`}/>}/>*/}
                    {/*    </Route>*/}
                    {/*    <Route path={"userreviews"} element={<GetAllEndpointTiles title={"Authors"} url={`http://localhost:8080/api/v1/userreviews`}/>}>*/}
                    {/*        <Route path={":id"} element={<GetEndpointCard title={"GetBy"} url={`http://localhost:8080/api/v1/userreviews/`}/>}/>*/}
                    {/*    </Route>*/}
                    </Route>


                    {/*navigation*/}
                    {/*books*/}
                    <Route path="/api/v1/books" element={<BookOverviewPage/>} />
                    <Route path="/api/v1/books/create" element={<BookCardCreatePage/>} />
                    <Route path="/api/v1/books/:id" element={<BookCardViewPage/>} />
                    <Route path="/api/v1/books/update/:id" element={<BookCardUpdatePage/>} />
                    {/**/}
                    {/*authors*/}
                    <Route path="/api/v1/authors" element={<AuthorOverviewPage/>} />
                    <Route path="/api/v1/authors/create" element={<AuthorCardCreatePage/>} />
                    <Route path="/api/v1/authors/:id" element={<AuthorCardViewPage/>} />
                    <Route path="/api/v1/authors/update/:id" element={<AuthorCardUpdatePage/>} />
                    {/**/}


                    {/*search*/}
                    <Route path={"/search"} element={<SearchBooks/>}/>

                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path={"/profile"} element={<Profile />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
            <div className={"container"}>
                <img className={"img-btm-banner"} src="src/assets/texture-1909992_1280.webp" alt="image bottom banner"/>
            </div>
            <Footer/>
        </div>
    // </>
  )
}

export default App
