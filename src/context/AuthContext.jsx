import {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import decodeJwt from "../helpers/decodeJwt.js";

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

    const login = async(token) => {
        localStorage.setItem('token', token);
        const decoded = decodeJwt(token);

        localStorage.setItem('roles', decoded.roles)

        const [userId, username] = decoded.sub.split('::').map(item => item.trim());
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);

        try {
            await axios.get(`http://localhost:8080/api/v1/books`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            setAuth({
                isAuth: true,
                user: {
                },
                status: 'done'
            });
        } catch (e) {
            setAuth({
                isAuth: false,
                user: null,
                status: 'done'
            });
        }

        navigate('/profile');
    }

    const logout = () => {
        setAuth({
            isAuth: false,
            user: null,
            status: 'done'
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('roles');
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