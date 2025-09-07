import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";

/**
 * In production you’d integrate RevenueCat SDK (Purchases).
 * For now we mock a status call to your backend `/subscription/status`.
 */
export default function SubscriptionScreen() {
    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Text variant="titleLarge">Subscription</Text>
            <Text>Current plan: Free (mock)</Text>
            <Button mode="contained" onPress={() => { /* open paywall / RevenueCat */ }}>
                Upgrade (stub)
            </Button>
        </View>
    );
}
