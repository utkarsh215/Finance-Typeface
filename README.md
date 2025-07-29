Finance‑typeface
Your Privacy‑First Personal Finance Companion
Track incomes & expenses, auto‑extract data from receipts/statements, get AI‑powered monthly insights, and visualize your money habits—all in one sleek web app.

🚀 Live Demo & Testing
🔗 App (Vercel):
https://finance-typeface-nine.vercel.app

🧪 Test Credentials:

Email: testuser01@gmail.com

Password: 123456

📺 Walkthrough Video:
Watch on Google Drive

🔍 What You Can Do
Manage Transactions

Create, view, filter, paginate & export income/expense entries

Scan Receipts & Payslips

Upload images/PDFs → Google Cloud Vision pulls out the text

Smart Data Extraction

Gemini AI pre‑fills amount, date & category automatically

Bulk Statement Import

Drop in PDF/CSV/XLS(X) → server parses + classifies (Credit → Income, Debit → Expense)

Dynamic Dashboard

Monthly overviews, savings trends, income vs. expense charts, category pie‑breakdowns

AI‑Generated Insights

Monthly summary card with personalized tips powered by Gemini prompts

Multi‑Year Statistics

Dive into historical totals, detailed expense categories, and savings analytics

Secure Login

Firebase Auth (email/password) with protected routes & session context

Export Options

Download your filtered data as CSV/XLS—PDF statements coming soon

Responsive & Accessible

Mobile‑friendly layouts, keyboard‑focus support, semantic markup

🛠️ Built With
Layer	Tools & Services
Frontend	Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Recharts
Server/API	Next.js Route Handlers, Node.js
Database	Firebase Firestore
Authentication	Firebase Auth (Email/Password)
AI & OCR	Google Cloud Vision API, Google Gemini (via AI Studio)
Hosting	Netlify
Dev Tools	ESLint, (Prettier), TypeScript, UUID, xlsx

🔧 Architecture at a Glance
<img width="100%" alt="High‑level flow diagram" src="https://github.com/utkarsh215/Finance-Typeface/blob/main/Finance-typeface.png?raw=true" />
plaintext
Copy
Edit
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
├── /api/stats/insights   → stored AI insights
└── /api/stats/summary    → raw stats aggregation

Firestore Collections
├── users/{uid}
├── income/{doc}: { uid, amount, source, date, createdAt }
└── expenses/{doc}: { uid, amount, category, date, createdAt }
⚙️ Getting Started
1. Clone & Install
bash
Copy
Edit
git clone https://github.com/utkarsh215/Finance-Typeface.git
cd Finance-Typeface
npm install
2. Environment Variables
Create a .env.local file with:

ini
Copy
Edit
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

# Google & Gemini
GOOGLE_CREDENTIALS_JSON=./google-credentials.json   # (Server only; don’t commit)
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
Place your downloaded google-credentials.json at the project root.

3. Run Locally
bash
Copy
Edit
npm run dev
# Visit http://localhost:3000
🔐 Firebase Setup
Create a new Firebase project.

Enable Authentication → Email/Password.

Initialize Firestore in production mode.

Configure security rules to restrict reads/writes to request.auth.uid.

Copy your Firebase web config into .env.local under the NEXT_PUBLIC_FIREBASE_* keys.

📄 License
Distributed under the MIT License.

Enjoy managing your finances with Finance‑typeface!
