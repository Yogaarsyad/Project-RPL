// backend/server.js : "Contoh Aja"


import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

/* ---------------- ROUTES ---------------- */

// Tes server
app.get("/", (req, res) => {
  res.send("Backend API Project RPL16 berjalan 🚀");
});

// 1. Pencatatan Makanan
let makanan = [];
app.post("/api/makanan", (req, res) => {
  const { nama, kalori } = req.body;
  const data = { id: makanan.length + 1, nama, kalori };
  makanan.push(data);
  res.status(201).json(data);
});
app.get("/api/makanan", (req, res) => {
  res.json(makanan);
});

// 2. Pencatatan Olahraga
let olahraga = [];
app.post("/api/olahraga", (req, res) => {
  const { aktivitas, durasi } = req.body; // durasi dalam menit
  const kaloriTerbakar = durasi * 5; // contoh hitung sederhana
  const data = { id: olahraga.length + 1, aktivitas, durasi, kaloriTerbakar };
  olahraga.push(data);
  res.status(201).json(data);
});
app.get("/api/olahraga", (req, res) => {
  res.json(olahraga);
});

// 3. Pencatatan Tidur
let tidur = [];
app.post("/api/tidur", (req, res) => {
  const { jamTidur, jamBangun } = req.body;
  const durasi = jamBangun - jamTidur; // sederhana, nanti bisa lebih canggih
  const data = { id: tidur.length + 1, jamTidur, jamBangun, durasi };
  tidur.push(data);
  res.status(201).json(data);
});
app.get("/api/tidur", (req, res) => {
  res.json(tidur);
});

// 4. Artikel Kesehatan (dummy data)
const artikel = [
  { id: 1, judul: "Tips Pola Makan Sehat", isi: "Perbanyak sayur dan buah setiap hari." },
  { id: 2, judul: "Manfaat Olahraga Rutin", isi: "Olahraga minimal 30 menit per hari meningkatkan kebugaran." }
];
app.get("/api/artikel", (req, res) => {
  res.json(artikel);
});

// 5. Rekomendasi Pola Hidup Sehat (dummy)
app.post("/api/rekomendasi", (req, res) => {
  const { berat, tinggi, tidur, olahraga } = req.body;
  let rekomendasi = "Tetap jaga kesehatan!";
  if (tidur < 6) rekomendasi = "Tambahkan durasi tidur untuk pemulihan tubuh.";
  else if (olahraga < 30) rekomendasi = "Luangkan waktu minimal 30 menit untuk olahraga.";
  res.json({ rekomendasi });
});

/* ---------------------------------------- */

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});
