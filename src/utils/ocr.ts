import Tesseract from "tesseract.js";

export const extractTextFromImage = async (
  image: File,
  lang: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    const { data } = await Tesseract.recognize(image, lang, {
      logger: (m) => {
        if (m.status === "recognizing text" && onProgress) {
          onProgress(m.progress);
        }
      },
    });

    return data.text;
  } catch (err) {
    console.error("OCR error:", err);
    return "";
  }
};