import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const login = (userData) => setUser(userData);
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // 백엔드에 현재 유저 정보 요청
            axios.get("http://localhost:8000/660/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((res) => {
                    login(res.data.user); // 로그인 처리
                })
                .catch(() => {
                    localStorage.removeItem("token");
                });
        }
    }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
