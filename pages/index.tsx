import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Canvas from "@/components/Canvas";
import { Geist, Geist_Mono } from "next/font/google";
import type { Widget } from '@/types/widget';

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export default function Home() {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  useEffect(() => {
    async function loadWidgets() {
      const res = await fetch("/api/widgets");
      const data = await res.json();
      setWidgets(data);
    }
    loadWidgets();
  }, []);

  const handleAddWidget = () => {
    const newId = crypto.randomUUID();
    setWidgets((prev) => [...prev, { id: newId, text: "" }]);
  };

  const handleUpdateWidget = async (id: string, text: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, text } : w))
    );
    await fetch("/api/widgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, text }),
    });
  };

  const handleDeleteWidget = async (id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
    await fetch("/api/widgets", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ display: "flex", fontFamily: "var(--font-geist-sans)" }}
    >
      <Sidebar onAddWidget={handleAddWidget} />
      <Canvas widgets={widgets} onUpdate={handleUpdateWidget} onDelete={handleDeleteWidget} />
    </div>
  );
}
