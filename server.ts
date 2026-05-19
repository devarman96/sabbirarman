import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import * as admin from "firebase-admin";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";
import { getFirestore } from "firebase-admin/firestore";

// Lazy initialize Gemini
let genAI: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not set.");
      return null;
    }
    genAI = new GoogleGenAI({ 
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAI;
}

// Lazy initialize Firebase Admin
let db: admin.firestore.Firestore | null = null;
function getDb() {
  if (!db) {
    const projectId = "balmy-archive-13n78";
    const databaseId = "ai-studio-b44a13dd-cce3-4cbe-806b-f21e98061fba";
    
    let app: admin.app.App;
    if (admin.apps.length === 0) {
      app = admin.initializeApp({
        projectId: projectId,
      });
    } else {
      app = admin.apps[0]!;
    }
    db = getFirestore(app, databaseId);
  }
  return db;
}

// Lazy initialize Nodemailer
function getTransporter() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const app = express();
const PORT = 3000;

app.use(express.json());

// API endpoints
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // 1. Save to Firestore
    const database = getDb();
    if (database) {
      await database.collection("messages").add({
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      });
    }

    // 2. Send Email Notification
    const transporter = getTransporter();
    if (transporter) {
      const receiverEmail = process.env.RECEIVER_EMAIL || "sabbirarmancst@gmail.com";
      await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        to: receiverEmail,
        subject: `New Message from ${name}`,
        text: `You have a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #6366f1;">New message from ${name}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; margin-top: 10px;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #eee;" />
            <p style="font-size: 12px; color: #666;">This message was automatically saved to your Firestore database.</p>
          </div>
        `,
      });
    }

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error in /api/contact:", error);
    res.status(500).json({ success: false, error: "Failed to process message." });
  }
});

app.get("/api/projects", (req, res) => {
  res.json([
    {
      id: 1,
      title: "E-commerce Website",
      category: "Web Development",
      description: "A modern web application featuring email confirmation, secure payment processing, and a comprehensive product browsing system. Focused on providing a seamless shopping experience.",
      tech: ["Python", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
      image: "https://i.postimg.cc/HnkCfGbL/Ecommerce.webp",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 2,
      title: "Quizzes Application",
      category: "EduTech",
      description: "An interactive learning platform with 10 default quizzes, customizable options for users, and secure authentication. Features progress tracking and profile-based results display.",
      tech: ["JavaScript", "HTML5", "CSS3", "Firebase"],
      image: "https://i.postimg.cc/FFLRFhQW/Quize-Application.webp",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 3,
      title: "Portfolio 3D",
      category: "Creative",
      description: "A high-end professional portfolio with 3D interactive elements using Three.js and Framer Motion. Features custom shaders and high-performance animations.",
      tech: ["React", "Three.js", "Framer Motion", "Tailwind"],
      image: "https://i.postimg.cc/prLtgNKX/3d-portfolio.webp",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 4,
      title: "Finance Tracker",
      category: "FinTech",
      description: "Real-time expense tracking application with detailed analytics dashboards. Supports multiple currencies and automated reports.",
      tech: ["React", "Node.js", "MongoDB", "Chart.js"],
      image: "https://i.postimg.cc/05wQ59qX/Finance-Tracker.webp",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 5,
      title: "Social Connect",
      category: "Web Development",
      description: "A social networking platform focused on privacy and real-time communication. Includes encrypted messaging and file sharing capabilities.",
      tech: ["Next.js", "Supabase", "Tailwind", "WebRTC"],
      image: "https://i.postimg.cc/c1nH1dND/Social-Connect.webp",
      liveLink: "#",
      githubLink: "#"
    },
    {
      id: 6,
      title: "Cloud System",
      category: "Entertainment",
      description: "A video streaming service with adaptive bitrate streaming and personalized recommendations using machine learning.",
      tech: ["React", "AWS S3", "Node.js", "Redis"],
      image: "https://i.postimg.cc/90Qjv3yX/cloud-system.webp",
      liveLink: "#",
      githubLink: "#"
    }
  ]);
});

app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;
  const ai = getGenAI();
  if (!ai) {
    return res.status(500).json({ error: "AI not configured" });
  }
  
  try {
    const chat = ai.chats.create({ 
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are an AI assistant for Sabbir Arman, a Senior Software Engineer. Use the following context: Sabbir is a full-stack developer with experience in React, Node.js, and Firebase. He has worked on e-commerce and edutech projects. Be professional, concise, and helpful. If asked, his contact email is sabbirarmancst@gmail.com."
      },
      history: history || [],
    });
    
    const result = await chat.sendMessage({ message: message });
    res.json({ text: result.text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

export default app;
