import { Tabs, Redirect } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Text } from "react-native";

export default function TabsLayout() {
  const { token } = useAuth();
  if (!token) return <Redirect href={"/(auth)/login" as any} />;

  return (
    <Tabs screenOptions={{ headerTitleAlign: "center" }}>
      <Tabs.Screen name="index" options={{ title: "Dashboard" }} />
      <Tabs.Screen name="upload" options={{ title: "Upload" }} />
      <Tabs.Screen name="subscription" options={{ title: "Subscription" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
