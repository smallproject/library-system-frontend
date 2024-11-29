import {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending'
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // if (token && isTokenValid(token)) {
        // this is temporary
        if (token) {
            void login(token);
        } else {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }
    }, []);

    async function login(token) {
        localStorage.setItem('token', token);

        const decodedToken = jwtDecode(token);
        const id = decodedToken.sub.split("::")[0];
        console.log("id: " +id)

        try {
            const response = await axios.get(`http://localhost:8080/api/v1/books`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response);

            setAuth({
                isAuth: true,
                user: {
                    // username: response.data.username,
                    // email: response.data.email,
                    // id: response.data.id,
                    // role: 'user'
                },
                status: 'done'
            });
        } catch (e) {
            console.log(e);
            setAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }

        console.log("Gebruiker is ingelogd");
        // setAuth(true);
        navigate('/profile');
    }

    function logout() {
        console.log("Gebruiker is uitgelogd");
        // setAuth(false);
        setAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('username');

        navigate('/');
    }

    const contextData = {
        isAuth: auth.isAuth,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;