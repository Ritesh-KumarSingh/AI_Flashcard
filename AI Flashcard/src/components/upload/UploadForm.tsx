import React, { useState } from "react";
import { extractTextFromImage } from "../../utils/ocr";

type Props = {
  onText: (text: string) => void;
};

export default function UploadForm({ onText }: Props) {
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedLang, setSelectedLang] = useState("eng");
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    setProgress(0);

    try {
      const text = await extractTextFromImage(file, selectedLang, (p: number) =>
        setProgress(Math.round(p * 100))
      );
      console.log("📝 Extracted text:", text); // Debug log
      onText(text);
    } catch (err) {
      console.error("OCR failed:", err);
      setError("❌ Failed to extract text. Try another image or language.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* 🌐 Language Selector */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Select Language:
      </label>
      <select
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
        className="p-2 border rounded bg-white dark:bg-gray-800 dark:text-white"
      >
        <option value="eng">English</option>
        <option value="hin">Hindi</option>
        <option value="spa">Spanish</option>
        <option value="fra">French</option>
        <option value="deu">German</option>
      </select>

      {/* 📁 File Input */}
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {fileName && (
        <p className="text-sm text-gray-400">Uploaded: {fileName}</p>
      )}

      {/* 🖼️ Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="max-w-xs rounded-lg border border-gray-300 dark:border-gray-700"
        />
      )}

      {/* ⏳ Loading Progress */}
      {loading && (
        <div className="space-y-2">
          <p className="text-indigo-600 font-medium">Extracting text from image…</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* ❗ Error Message */}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}
