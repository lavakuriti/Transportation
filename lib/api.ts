// lib/api.ts
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_URL } from "@/constants/config";

export const api = axios.create({
    baseURL: API_URL,
    timeout: 12000,
});

api.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
