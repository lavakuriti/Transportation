import React, { useState } from "react";
import { View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button, Text } from "react-native-paper";
import { api } from "@/lib/api";
import * as Notifications from "expo-notifications";

export default function UploadScreen() {
    const [uri, setUri] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState("");

    const pick = async () => {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) { setMsg("Permission denied"); return; }
        const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
        if (!res.canceled) setUri(res.assets[0].uri);
    };

    const upload = async () => {
        if (!uri) return;
        setBusy(true); setMsg("");
        const form = new FormData();
        // @ts-ignore
        form.append("file", { uri, name: "document.jpg", type: "image/jpeg" });
        try {
            const res = await api.post("/documents/upload", form, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setMsg("Uploaded!");
            // Local notification to simulate push
            await Notifications.scheduleNotificationAsync({
                content: { title: "Document uploaded", body: "Your compliance doc was uploaded." },
                trigger: null,
            });
        } catch (e: any) {
            setMsg(e?.response?.data?.error || "Upload failed");
        } finally { setBusy(false); }
    };

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Button mode="outlined" onPress={pick}>Pick Image</Button>
            {uri ? <Image source={{ uri }} style={{ width: "100%", height: 220, borderRadius: 8 }} /> : null}
            <Button mode="contained" onPress={upload} loading={busy} disabled={!uri}>Upload</Button>
            {msg ? <Text>{msg}</Text> : null}
        </View>
    );
}
