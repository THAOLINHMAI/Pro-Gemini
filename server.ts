import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI instance
let aiClient: GoogleGenAI | null = null;
function getAI() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    aiClient = new GoogleGenAI({ apiKey: key });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Gia Sư KHTN Lớp 8", author: "Giáo Hà AI" });
});

// AI Tutor chat & explanation endpoint
app.post("/api/tutor", async (req, res) => {
  try {
    const { question, lessonTitle, studentName, studentClass, chatHistory, userPrompt } = req.body;
    const ai = getAI();

    const systemInstruction = `Bạn là "Giáo Hà AI" - Gia sư Khoa học Tự nhiên lớp 8 chuẩn theo bộ sách "Kết nối tri thức với cuộc sống".
Phong cách sư phạm của bạn:
- Thân thiện, ân cần, giải thích khúc chiết, dễ hiểu cho học sinh lớp 8 (xưng hô Thầy/Cô Giáo Hà và gọi em ${studentName || "học sinh"}).
- Nắm vững toàn bộ chương trình KHTN 8 (Hóa học: Mol, Nồng độ dung dịch, PTHH, Tốc độ phản ứng, Acid, Base, Oxide, Muối, Phân bón; Vật lí: Khối lượng riêng, Áp suất, Archimedes, Moment lực, Đòn bẩy, Điện, Nhiệt; Sinh học: Cơ thể người từ tiêu hóa, tuần hoàn, hô hấp, bài tiết, thần kinh, nội tiết, da, sinh sản; Môi trường & Sinh thái).
- Khi giải bài toán hóa hoặc lí: Luôn trình bày từng bước (Tóm tắt đề -> Công thức áp dụng -> Thay số và tính toán -> Kết luận).
- Khích lệ học sinh tư duy, gợi mở cách giải quyết vấn đề thực tế.`;

    const prompt = userPrompt || `Học sinh ${studentName || "Em"} (Lớp ${studentClass || "8"}) đang ôn tập bài: "${lessonTitle || "KHTN 8"}".
Câu hỏi cần giải đáp / hướng dẫn:
${question}

Hãy giải thích chi tiết, chính xác và dễ hiểu nhất cho em.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || "Thầy/Cô Giáo Hà đã nhận được câu hỏi. Hãy cùng xem lại lý thuyết nhé!" });
  } catch (error: any) {
    console.error("Error in /api/tutor:", error);
    res.status(500).json({
      error: error?.message || "Không thể kết nối với Giáo Hà AI lúc này. Vui lòng kiểm tra lại!",
      fallback: "Em có thể xem lại lời giải chi tiết và tóm tắt lý thuyết của bài học trong phần 'Ôn lý thuyết' nhé!"
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Gia Sư KHTN Lớp 8 is running on http://localhost:${PORT}`);
  });
}

startServer();
