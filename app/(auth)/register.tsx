import React, { useState } from "react";
import { View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useRouter, Link } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function RegisterScreen() {
    const { register } = useAuth();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");

    const onRegister = async () => {
        setBusy(true); setErr("");
        try {
            await register(name.trim(), email.trim(), password);
            router.replace("/(tabs)");
        } catch (e: any) {
            setErr(e?.response?.data?.error || "Registration failed");
        } finally { setBusy(false); }
    };

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Text variant="titleLarge">Register</Text>
            <TextInput label="Name" value={name} onChangeText={setName} />
            <TextInput label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <TextInput label="Password" value={password} onChangeText={setPassword} secureTextEntry />
            {err ? <Text style={{ color: "red" }}>{err}</Text> : null}
            <Button mode="contained" onPress={onRegister} loading={busy}>Create Account</Button>
            <Link href={"/(auth)/login" as any}>Back to login</Link>
        </View>
    );
}
