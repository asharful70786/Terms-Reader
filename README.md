<div align="center">

# 📜✨ TermsReader
**AI-Powered Terms & Conditions Summarizer**

> Tired of spending hours reading endless, complex legal jargon?  
> **TermsReader** simplifies Terms & Conditions into a **short, human-readable report in seconds.**

🔗 **Live Demo:** [https://term.zenpix.shop/](https://term.zenpix.shop/)

![AI](https://img.shields.io/badge/AI--Powered-OpenAI-blue?logo=openai&style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-React-green?logo=react&style=flat-square)
![Backend](https://img.shields.io/badge/Backend-Node.js-yellow?logo=node.js&style=flat-square)
![OCR](https://img.shields.io/badge/OCR-Tesseract.js-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-purple?style=flat-square)

<div align="center">
  <img src="https://raw.githubusercontent.com/asharful70786/Terms-Reader/main/server/public/image_2025-10-04_18-15-39.png" alt="TermsReader Preview" width="800"/>
  <p>📸 App Preview — Simple, Fast, and AI-Powered</p>
</div>

</div>

---

## 🌟 Overview

Reading **Terms & Conditions** can take hours, and legal language is often too complex to understand.  

With **TermsReader**:
- 📋 Copy-paste or screenshot any Terms & Conditions.  
- ⚡ Get an **instant summary** in **3–5 seconds**.  
- 🧠 Let AI do the heavy lifting so you can save time for things that matter.  

---

## ✨ Features

- ⚡ **Instant Summaries** – Simplifies legal documents in seconds  
- 🧠 **AI-Powered** – Built using OpenAI API  
- 📷 **Image to Text** – Extracts text from screenshots using OCR ([Tesseract.js](https://tesseract.projectnaptha.com/))  
- 🎨 **Clean UI** – Minimal, distraction-free design  
- 🌍 **Open Source** – Contributions welcome  

---

## 🛠️ Tech Stack

**Frontend**
- React + Vite  
- TailwindCSS  
- Tesseract.js (OCR)

**Backend**
- Node.js + Express  
- OpenAI API (summarization)

---

## 🚀 Getting Started

Run the project locally in a few steps:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/asharful70786/Terms-Reader.git
cd termsreader
````

### 2️⃣ Setup the Server

```bash
cd server
npm install
```

Create a `.env` file and add your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

Start the backend:

```bash
npm run dev
```

### 3️⃣ Setup the Client

```bash
cd client
npm install
npm run dev
```

### 4️⃣ Open in Browser

Visit: [http://localhost:5173](http://localhost:5173)

---

## 📂 Project Structure

```
termsreader/
 ├── client/   # React frontend (UI + OCR)
 ├── server/   # Node.js backend (API + OpenAI integration)
 └── README.md # Project documentation
```

---

## 🧠 How It Works

1. 📝 **User Input**
   User either pastes text or uploads a screenshot of Terms & Conditions.

2. 🔍 **OCR Extraction**
   If an image is uploaded, **Tesseract.js** extracts text from it.

3. 🧩 **AI Summarization**
   The text is sent to the backend, where **OpenAI** summarizes it into short, simple bullet points and highlights key clauses.

4. ⚡ **Instant Output**
   The summary appears within seconds in a clean, readable UI.

---

### 💡 Example Backend Logic

```js
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const summarizeTerms = async (text) => {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a legal simplifier. Summarize terms and conditions in plain, friendly language with key takeaways.",
      },
      { role: "user", content: text },
    ],
  });
  return response.choices[0].message.content;
};
```

---

## 🧭 Roadmap

* [ ] Highlight risky clauses (auto-renewal, data privacy, refunds)
* [ ] Add multi-language support (Hindi, Bengali, Spanish, etc.)
* [ ] Export summaries as PDF/Docx
* [ ] Browser extension (summarize any site in one click)
* [ ] Dark mode and better animations
* [ ] Voice summary (text-to-speech)

---

## 🤝 Contributing

Contributions make open-source thrive! Got ideas? Jump in.

**Steps:**

1. Fork the repo 🍴
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "Added cool feature"`
4. Push: `git push origin feature/YourFeature`
5. Open a Pull Request 🎉

---

## 📢 About

Built to save time and sanity while reading long, jargon-filled legal docs.
Instead of hours of reading, get the gist in seconds.

👉 Try it now: [https://term.zenpix.shop/](https://term.zenpix.shop/)

---

## ⭐ Support

If you find this project helpful:

* ⭐ Star the repository
* 🔗 Share it with your friends
* 💡 Contribute your ideas

---

<div align="center">

💡 *“Don’t waste hours on legalese. Let AI do the heavy lifting.”*

Built with ❤️ by **Ashraful / viralgut**
🌐 [Agency Website](https://codercamp.ashraful.in)

</div>


