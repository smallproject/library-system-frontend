// import './App.css'
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage.jsx";

import AboutUs from "./pages/AboutUs.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Catalog from "./pages/Catalog.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./components/Header.jsx";

import BookOverviewPage from "./pages/Book/Overview.jsx";
import BookCardViewPage from "./pages/Book/CardView.jsx";
import BookCardUpdatePage from "./pages/Book/CardUpdateView.jsx";
import BookCardCreatePage from "./pages/Book/CardCreateView.jsx";

import AuthorOverviewPage from "./pages/Author/Overview.jsx";
import AuthorCardViewPage from "./pages/Author/CardView.jsx";
import AuthorCardUpdatePage from "./pages/Author/CardUpdateView.jsx";
import AuthorCardCreatePage from "./pages/Author/CardCreateView.jsx";

import UserOverviewPage from "./pages/User/Overview.jsx";
import UserCardViewPage from "./pages/User/CardView.jsx";
import UserCardUpdatePage from "./pages/User/CardUpdateView.jsx";
import UploadImage from "./pages/User/imageRequest/ImageRequestPage.jsx";

import InventoryOverviewPage from "./pages/Inventory/Overview.jsx";
import InventoryCardViewPage from "./pages/Inventory/CardView.jsx";
import InventoryCardUpdatePage from "./pages/Inventory/CardUpdateView.jsx";
import InventoryCardCreatePage from "./pages/Inventory/CardCreateView.jsx";

import ReservationOverviewPage from "./pages/Reservation/Overview.jsx";
import ReservationCardViewPage from "./pages/Reservation/CardView.jsx";
import ReservationCardUpdatePage from "./pages/Reservation/CardUpdateView.jsx";

import Profile from "./pages/Authentication/Profile.jsx";
import SignIn from "./pages/Authentication/SignIn.jsx";
import SignUp from "./pages/Authentication/SignUp.jsx";
import SearchBooks from "./pages/SearchBooks/SearchBooks.jsx";
import UpdateProfile from "./pages/Authentication/updateProfile.jsx";
import Cart from "./pages/Features/Cart.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import {useContext, useEffect} from "react";
import {AuthContext} from "./context/AuthContext.jsx";
import {ThemeContext} from "./context/ThemeContext.jsx";



function App() {
    const {isAuth} = useContext(AuthContext);
    const {theme, toggleTheme} = useContext(ThemeContext);

    useEffect(() => {
        document.body.className = theme === 'light' ? '' : 'dark-mode';
    }, [theme]);

    return (
        <div className={`global-theme ${theme === 'dark' ? 'dark-mode' : ''} `}>
            <Header/>
            <div className="container-fluid py-4">
                <div className="row">
                    <main className={"col-12"}>
                        <Routes>
                            <Route path="/" element={<Homepage/>}/>

                            <Route path="/api/v1/books"
                                   element={<ProtectedRoute element={<BookOverviewPage/>} isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/books/create" element={<ProtectedRoute element={<BookCardCreatePage/>}
                                                                                        isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/books/:id" element={<BookCardViewPage/>}/>
                            <Route path="/api/v1/books/update/:id"
                                   element={<ProtectedRoute element={<BookCardUpdatePage/>}
                                                            isAuthenticated={isAuth}/>}/>

                            <Route path="/api/v1/authors" element={<ProtectedRoute element={<AuthorOverviewPage/>}
                                                                                   isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/authors/create"
                                   element={<ProtectedRoute element={<AuthorCardCreatePage/>}
                                                            isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/authors/:id" element={<AuthorCardViewPage/>}/>
                            <Route path="/api/v1/authors/update/:id"
                                   element={<ProtectedRoute element={<AuthorCardUpdatePage/>}
                                                            isAuthenticated={isAuth}/>}/>

                            <Route path="/api/v1/inventories"
                                   element={<ProtectedRoute element={<InventoryOverviewPage/>}
                                                            isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/inventories/create"
                                   element={<ProtectedRoute element={<InventoryCardCreatePage/>}
                                                            isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/inventories/:id"
                                   element={<ProtectedRoute element={<InventoryCardViewPage/>}
                                                            isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/inventories/update/:id"
                                   element={<ProtectedRoute element={<InventoryCardUpdatePage/>}
                                                            isAuthenticated={isAuth}/>}/>

                            <Route path="/api/v1/reservations"
                                   element={<ProtectedRoute element={<ReservationOverviewPage/>}
                                                            isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/reservations/:id"
                                   element={<ProtectedRoute element={<ReservationCardViewPage/>}
                                                            isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/reservations/update/:id"
                                   element={<ProtectedRoute element={<ReservationCardUpdatePage/>}
                                                            isAuthenticated={isAuth}/>}/>

                            <Route path={"/search"} element={<SearchBooks/>}/>

                            <Route path="/catalog" element={<Catalog/>}/>
                            <Route path="/about" element={<AboutUs/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/reserve" element={<Cart/>}/>

                            <Route path="/signin" element={<SignIn/>}/>
                            <Route path="/signup" element={<SignUp/>}/>
                            <Route path={"/profile"}
                                   element={<ProtectedRoute element={<Profile/>} isAuthenticated={isAuth}/>}/>
                            <Route path={"/profile/update"}
                                   element={<ProtectedRoute element={<UpdateProfile/>} isAuthenticated={isAuth}/>}/>
                            <Route path={"/api/v1/users"}
                                   element={<ProtectedRoute element={<UserOverviewPage/>} isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/users/:id"
                                   element={<ProtectedRoute element={<UserCardViewPage/>} isAuthenticated={isAuth}/>}/>
                            <Route path="/api/v1/users/update/:id"
                                   element={<ProtectedRoute element={<UserCardUpdatePage/>}
                                                            isAuthenticated={isAuth}/>}/>
                            <Route path={"/profile/uploadimage"}
                                   element={<ProtectedRoute element={<UploadImage/>} isAuthenticated={isAuth}/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </main>

                </div>
            </div>

            <Footer/>
        </div>
    )
}

export default App
