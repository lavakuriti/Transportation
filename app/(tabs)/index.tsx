import React, { useEffect, useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { Card, Text } from "react-native-paper";
import { api } from "@/lib/api";

type Doc = { id: number; file_url: string; type: string; created_at: string };

export default function DashboardScreen() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/documents/list");
      setDocs(res.data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, gap: 12 }}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
    >
      <Text variant="titleLarge">Compliance Documents</Text>
      {docs.map(d => (
        <Card key={d.id}>
          <Card.Title title={d.type} subtitle={new Date(d.created_at).toLocaleString()} />
          <Card.Content><Text>{d.file_url}</Text></Card.Content>
        </Card>
      ))}
      {!docs.length && !loading ? <Text>No documents yet.</Text> : null}
    </ScrollView>
  );
}
