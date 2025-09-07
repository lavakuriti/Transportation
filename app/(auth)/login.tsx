import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useRouter, Link } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function LoginScreen() {
    const { login } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");

    const onLogin = async () => {
        setBusy(true); setErr("");
        try {
            await login(email.trim(), password);
            router.replace("/(tabs)");
        } catch (e: any) {
            setErr(e?.response?.data?.error || "Login failed");
        } finally { setBusy(false); }
    };

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Text variant="titleLarge">Login</Text>
            <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
            {err ? <Text style={{ color: "red" }}>{err}</Text> : null}
            <Button mode="contained" onPress={onLogin} loading={busy}>Login</Button>
            <Link href={"/(auth)/register" as any}>No account? Register</Link>
        </View>
    );
}
