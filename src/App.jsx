import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function QuranSurahExplorer() {
  const [surahNumber, setSurahNumber] = useState(1);
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSurah = async (number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.alquran.cloud/v1/surah/${number}`);
      setSurahData(response.data.data);
    } catch (error) {
      console.error("Error fetching surah:", error);
      setError("Failed to load Surah. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurah(surahNumber);
  }, [surahNumber]);

  return (
    <div className="max-w-5xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Quran Surah Explorer</h1>

      <div className="mb-6">
        <select
          value={surahNumber}
          onChange={(e) => setSurahNumber(Number(e.target.value))}
          className="border rounded p-2 text-lg"
        >
          {[...Array(114)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{`Surah ${i + 1}`}</option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center text-red-600 mb-4">
          ⚠️ {error}
        </div>
      )}

      {!loading && !error && surahData && (
        <>
          <div className="mb-6 p-4 border rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">{surahData.englishName} ({surahData.name})</h2>
            <p>Translation: {surahData.englishNameTranslation}</p>
            <p>Revelation Type: {surahData.revelationType}</p>
            <p>Number of Ayahs: {surahData.numberOfAyahs}</p>
          </div>

          <div className="space-y-4">
            {surahData.ayahs.map((ayah) => (
              <div key={ayah.number} className="p-4 bg-blue-50 border rounded shadow">
                <p className="text-2xl text-right font-serif leading-relaxed">{ayah.text}</p>
                <p className="text-sm text-gray-600 mt-2">Ayah {ayah.numberInSurah}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default QuranSurahExplorer;