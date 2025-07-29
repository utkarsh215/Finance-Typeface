# Finance‑typeface

> **Your Privacy‑First Personal Finance Companion**  
> Track incomes & expenses, auto‑extract data from receipts/statements, get AI‑powered monthly insights, and visualize your money habits—all in one sleek web app.

---

## 🚀 Live Demo & Testing

- **🔗 App (Vercel):**  
 https://finance-typeface.vercel.app/
- **🧪 Test Credentials:**  
  - **Email:** `testuser01@gmail.com`  
  - **Password:** `123456`  
- **📺 Walkthrough Video:**  
  ([https://www.loom.com/share/0ab70fd4dd904a02a9d0e2601c37dff5?sid=68485c86-48c0-4650-91ff-84faff1cc97c])

---

## 🔍 What You Can Do

1. **Manage Transactions**  
   - Create, view, filter, paginate & export income/expense entries  
2. **Scan Receipts & Payslips**  
   - Upload images/PDFs → Google Cloud Vision pulls out the text  
3. **Smart Data Extraction**  
   - Gemini AI pre‑fills amount, date & category automatically  
4. **Bulk Statement Import**  
   - Drop in PDF/CSV/XLS(X) → server parses + classifies (Credit → Income, Debit → Expense)  
5. **Dynamic Dashboard**  
   - Monthly overviews, savings trends, income vs. expense charts, category pie‑breakdowns  
6. **AI‑Generated Insights**  
   - Monthly summary card with personalized tips powered by Gemini prompts  
7. **Multi‑Year Statistics**  
   - Dive into historical totals, detailed expense categories, and savings analytics  
8. **Secure Login**  
   - Firebase Auth (email/password) with protected routes & session context  
9. **Export Options**  
   - Download your filtered data as CSV/XLS—PDF statements coming soon  
10. **Responsive & Accessible**  
    - Mobile‑friendly layouts, keyboard‑focus support, semantic markup  

---

## 🛠️ Built With

| Layer         | Tools & Services                                                                 |
| ------------- | ------------------------------------------------------------------------------- |
| Frontend      | Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts              |
| Server/API    | Next.js Route Handlers, Node.js                                                  |
| Database      | Firebase Firestore                                                               |
| Authentication| Firebase Auth (Email/Password)                                                   |
| AI & OCR      | Google Cloud Vision API, Google Gemini (via AI Studio)                           |
| Hosting       | Netlify                                                                          |
| Dev Tools     | ESLint, (Prettier), TypeScript, UUID, xlsx                                        |

---

## 🔧 Architecture at a Glance

<img width="100%" alt="High‑level flow diagram" src="https://github.com/utkarsh215/Finance-Typeface/blob/main/Finance-typeface.png?raw=true" />

```plaintext
Client (React + Tailwind UI)
│
├── AuthContext (Firebase session)
├── Pages: Dashboard | Income | Expenses | Statistics
│   ├── Data Hooks (Firestore queries + filters)
│   └── UI Components (Tables, Charts, Forms)
├── Receipt Upload → POST /api/amount-extract
└── Bulk Import → POST /api/file-transaction

Server (Next.js API Routes)
├── /api/amount-extract   → Vision + Gemini → { amount, category, date, … }
├── /api/file-transaction → Parse CSV/XLS/PDF → classify lines
├── /api/insight          → Gemini → monthly summary & tips

Firestore Collections
├── users/{uid}
├── income/{doc}: { uid, amount, source, date, createdAt }
└── expenses/{doc}: { uid, amount, category, date, createdAt }
```
---

## Environment Variables

Create a `.env.local` (never commit). Example:

```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxxxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxxxxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxxxxx

# Google / Gemini
GOOGLE_CREDENTIALS_JSON=./google-credentials.json  # (Server-only, DO NOT COMMIT)
GEMINI_API_KEY=xxxxxxxx

```

## Local Development

```bash
# 1. Install deps
npm install  # or npm / yarn

# 2. Add .env.local and credentials
# 3. Run dev
npm dev

# 4. Open
http://localhost:3000
```
---
## Firebase Setup

1. Create Firebase project.
2. Enable **Authentication** (Email/Password).
3. Create **Firestore** (production mode with security rules referencing `request.auth.uid`).
5. Copy config → `.env.local` as `NEXT_PUBLIC_FIREBASE_*` variables.


