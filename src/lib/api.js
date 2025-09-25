import { supabase } from './supabase';
export const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

async function authHeader() {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = "GET", body } = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export const api = {
    get: (p) => request(p),
    post: (p, b) => request(p, { method: "POST", body: b }),
};