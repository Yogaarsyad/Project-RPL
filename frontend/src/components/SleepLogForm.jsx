import React, { useState } from 'react';

function SleepLogForm({ onAddLog }) {
  const [tanggal, setTanggal] = useState('');
  const [waktuTidur, setWaktuTidur] = useState('');
  const [waktuBangun, setWaktuBangun] = useState('');
  const [kualitasTidur, setKualitasTidur] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAddLog({
      tanggal,
      waktu_tidur: new Date(waktuTidur).toISOString(),
      waktu_bangun: new Date(waktuBangun).toISOString(),
      kualitas_tidur: kualitasTidur,
    });
    setTanggal('');
    setWaktuTidur('');
    setWaktuBangun('');
    setKualitasTidur('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Catat Tidur Baru</h2>
      <div className="mb-2">
        <label className="block mb-1">Tanggal</label>
        <input
          type="date"
          value={tanggal}
          onChange={e => setTanggal(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Waktu Tidur</label>
        <input
          type="datetime-local"
          value={waktuTidur}
          onChange={e => setWaktuTidur(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Waktu Bangun</label>
        <input
          type="datetime-local"
          value={waktuBangun}
          onChange={e => setWaktuBangun(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Kualitas Tidur</label>
        <input
          type="text"
          value={kualitasTidur}
          onChange={e => setKualitasTidur(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Contoh: Baik, Buruk, Sedang"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Tambah Catatan Tidur'}
      </button>
    </form>
  );
}

export default SleepLogForm;