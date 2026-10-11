# 🎯 GDG RBU — Event Management & Community Platform

> **Google Developer Groups On Campus · Ramdeobaba University (Nagpur)**  
> Official Full-Stack Event Registration, Community & Showcase Platform

Built with a high-contrast Neo-Brutalist design (featuring a true jet-black `#000000` dark theme), **React + Vite**, **FastAPI** (Python), and **SQLite**.

---

## 🌟 Key Highlights & Features

- ⚡ **Dedicated Creative About Page (`/about`)**:
  - Highlights **What is GDG** (Global) vs **What is GDG RBU** (Local chapter founded 2019 under Faculty Advisor Dr. Khushboo Khurana).
  - Official GDG RBU core team showcase with authentic group photography.
  - Specialized tracks: Web & Cloud, AI/ML & GenAI, Flutter/Mobile, CP/DSA, UI/UX.
  - Verified social connect: Instagram ([@gdg_rbu](https://www.instagram.com/gdg_rbu/)), LinkedIn ([company/gdg-rbu](https://in.linkedin.com/company/gdg-rbu)), and X ([@gdsc_rcoem](https://x.com/gdsc_rcoem)).
- 🖤 **Jet-Black Dark Theme**: Pure `#000000` background with crisp high-contrast retro-brutalist borders and vibrant Google-palette accents.
- 🎟️ **Event Registration & QR Tickets**: Instant registration with unique downloadable QR pass verification.
- 🛡️ **JWT Authentication & Role Security**: Secure member accounts + dedicated Admin Command Center.
- 📊 **Analytics Dashboard**: Live registration metrics, track breakdowns, and attendance tracking.
- 🚀 **Zero-Configuration Deployment**: Pre-configured SPA rewrite rules for **Vercel** (`vercel.json`) and **Netlify** (`_redirects` & `netlify.toml`).

---

## 🚀 Deployment Guides

### Option A: Deploy on Vercel (Recommended)

1. **Push your repository to GitHub** (see Git instructions below).
2. Go to [vercel.com](https://vercel.com/) and click **"Add New..." → "Project"**.
3. Import your GitHub repository:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` *(or leave as root, root `vercel.json` will route to frontend automatically)*
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Vercel will build and deploy your site in ~30 seconds with full client-side routing support.

---

### Option B: Deploy on Netlify

1. Go to [netlify.com](https://www.netlify.com/) and click **"Add new site" → "Import an existing project"**.
2. Select your GitHub repository:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Site**. The included `frontend/public/_redirects` and `netlify.toml` ensure instant SPA route resolution.

---

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+ & npm
- Python 3.10+ (for backend)

### 1. Frontend Development
```bash
cd frontend
npm install
npm run dev
```
Accessible at: `http://localhost:5173`

### 2. Backend Development (Optional / API Server)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate    # Mac/Linux (or venv\Scripts\activate on Windows)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Interactive API Documentation: `http://localhost:8000/docs`

### 3. One-Command Docker Setup
```bash
docker-compose up --build
```

---

## 📁 Repository Structure

```
event-management/
├── frontend/                     # React + Vite Frontend
│   ├── public/
│   │   ├── _redirects            # Netlify SPA redirect rule
│   │   ├── gdg-logo.png          # Official GDG emblem
│   │   └── team_rbu_members_2026.jpg # Core team photo
│   ├── src/
│   │   ├── pages/
│   │   │   ├── About.jsx         # Standalone creative About page
│   │   │   ├── Home.jsx          # Hero, highlights & tracks
│   │   │   ├── Events.jsx        # Event directory & filtering
│   │   │   ├── Dashboard.jsx     # User pass & tickets
│   │   │   └── Admin.jsx         # Event management portal
│   │   ├── components/           # Navbar, Footer, Cards
│   │   └── index.css             # Jet-black theme & neo-brutalist tokens
│   ├── vercel.json               # Vercel SPA routing rewrites
│   └── netlify.toml              # Netlify SPA fallback config
├── backend/                      # FastAPI Python Backend
│   ├── app/                      # Models, Routers, Services
│   ├── requirements.txt
│   └── Dockerfile
├── vercel.json                   # Root Vercel config
├── netlify.toml                  # Root Netlify config
├── docker-compose.yml
└── README.md
```

---

## 🌐 Official GDG RBU Socials

- 📸 **Instagram**: [@gdg_rbu](https://www.instagram.com/gdg_rbu/)
- 💼 **LinkedIn**: [GDG RBU](https://in.linkedin.com/company/gdg-rbu)
- 🐦 **X / Twitter**: [@gdsc_rcoem](https://x.com/gdsc_rcoem)
