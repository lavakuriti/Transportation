// context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { api } from "@/lib/api";

type User = { id: number; email: string; name?: string };
type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as any);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        (async () => {

            await SecureStore.setItemAsync("foo", "bar");
            const v = await SecureStore.getItemAsync("foo");
            console.log("SecureStore test value:", v);
            console.log("dhvjhdjdjdvjdvjg")
            const saved = await SecureStore.getItemAsync("token");
            console.log("🚀 ~ AuthProvider ~ saved:", saved)
            if (saved) {
                setToken(saved);
                // Optionally fetch user profile
                try {
                    const me = await api.get("/auth/me").catch(() => null);
                    if (me?.data) setUser(me.data);
                } catch { }
            }
        })();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await api.post("/auth/login", { email, password });
        const t = res.data.token;
        setToken(t);
        await SecureStore.setItemAsync("token", t);
        // optional: set user if backend returns it
        setUser({ id: 0, email });
    };

    const register = async (name: string, email: string, password: string) => {
        await api.post("/auth/register", { name, email, password });
        await login(email, password);
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        await SecureStore.deleteItemAsync("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
