import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
    const { logout } = useAuth();
    const router = useRouter();

    const onLogout = async () => {
        await logout();
        router.replace("/(auth)/login" as any);
    };

    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Text variant="titleLarge">Profile</Text>
            <Button mode="outlined" onPress={onLogout}>Logout</Button>
        </View>
    );
}
