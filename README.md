# Fortiva – Insurance Agency Performance Hub

A full-stack Next.js web app with:
- 🏆 Live Leaderboard (from Google Sheets)
- 📋 Scripts Library (Final Expense, Mortgage Protection, Medicare, Life Insurance)
- 🛡 Objection Handling Trainer (powered by Claude AI)
- 🤖 AI Role Play with Coaching (powered by Claude AI)

---

## Step-by-Step Setup Guide

### Step 1 — Install Node.js

1. Go to https://nodejs.org
2. Download the **LTS** version (the green button)
3. Install it — click through all the defaults
4. To verify it worked, open **Terminal** (Mac) or **Command Prompt** (Windows) and type:
   ```
   node --version
   ```
   You should see something like `v20.x.x`

---

### Step 2 — Unzip and Open the Project

1. Unzip the `fortiva.zip` file you downloaded
2. Open your Terminal / Command Prompt
3. Navigate into the folder:
   ```bash
   cd path/to/fortiva
   ```
   (Tip: on Mac you can type `cd ` then drag the folder into Terminal)

---

### Step 3 — Install Project Dependencies

In your terminal, run:
```bash
npm install
```

This downloads all the packages the app needs. It takes 1-3 minutes the first time.

---

### Step 4 — Get Your Anthropic API Key

1. Go to https://console.anthropic.com
2. Sign up or log in
3. Click **API Keys** in the left sidebar
4. Click **Create Key**
5. Copy the key — it starts with `sk-ant-`
6. **Keep this private — treat it like a password**

---

### Step 5 — Publish Your Google Sheet as CSV

1. Go to https://sheets.google.com and create a new spreadsheet
2. Set up Row 1 exactly like this:

   | A            | B               |
   |--------------|-----------------|
   | Agent Name   | Annual Premium  |

3. Add agent data below (no dollar signs or commas, just numbers):

   | Agent Name    | Annual Premium |
   |---------------|----------------|
   | Sarah Johnson | 14500          |
   | Mike Torres   | 9800           |
   | Sarah Johnson | 6200           |

4. Click **File → Share → Publish to web**
5. First dropdown → choose your sheet tab (e.g. "Sheet1")
6. Second dropdown → choose **Comma-separated values (.csv)**
7. Click **Publish** → OK
8. Copy the URL — it looks like:
   ```
   https://docs.google.com/spreadsheets/d/e/XXXXX/pub?gid=0&single=true&output=csv
   ```

---

### Step 6 — Create Your Environment File

1. In the `fortiva` folder, find the file called `.env.local.example`
2. Make a copy of it and rename the copy to `.env.local`
3. Open `.env.local` in any text editor (Notepad, TextEdit, VS Code)
4. Fill in your values:

```
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
NEXT_PUBLIC_SHEET_CSV_URL=https://docs.google.com/spreadsheets/d/e/YOUR_SHEET_ID/pub?gid=0&single=true&output=csv
```

Save the file.

---

### Step 7 — Start the App

In your terminal, run:
```bash
npm run dev
```

Open your browser and go to:
```
http://localhost:3000
```

That's it — Fortiva is running! 🎉

---

### Step 8 — Use It on Your Phone

As long as your phone is on the same WiFi as your computer:

1. Find your computer's local IP address:
   - Mac: System Settings → Network → Wi-Fi → Details → IP Address
   - Windows: `ipconfig` in Command Prompt → look for IPv4 Address
2. On your phone browser, go to:
   ```
   http://[YOUR_IP]:3000
   ```
   Example: `http://192.168.1.42:3000`

---

## Deploying to the Internet (Vercel — Free)

To share Fortiva with your whole team:

1. Push your code to GitHub
2. Go to https://vercel.com and sign up with GitHub
3. Click **New Project** → import your repo
4. Add your environment variables in Vercel's dashboard (Settings → Environment Variables)
5. Click **Deploy** — you'll get a live URL like `fortiva.vercel.app`

---

## Updating the Leaderboard

Just add rows to your Google Sheet. Click **Refresh** in the app. Done.

Duplicate agent names are automatically combined into one total — so you can add one row per sale.

---

## Project Structure

```
fortiva/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── leaderboard/route.ts   ← fetches & parses Google Sheet
│   │   │   ├── objection/route.ts     ← Claude objection handling
│   │   │   └── roleplay/route.ts      ← Claude role play + coaching
│   │   ├── leaderboard/page.tsx       ← Leaderboard UI
│   │   ├── scripts/page.tsx           ← Scripts library UI
│   │   ├── objections/page.tsx        ← Objection trainer UI
│   │   ├── roleplay/page.tsx          ← Role play UI
│   │   └── layout.tsx                 ← App shell + navigation
│   ├── components/
│   │   └── Nav.tsx                    ← Bottom navigation bar
│   ├── lib/
│   │   └── scripts-data.ts            ← All script content
│   └── styles/globals.css
├── .env.local.example                 ← Copy this to .env.local
└── README.md
```

---

## Customizing Scripts

Edit `/src/lib/scripts-data.ts` to add, edit, or remove scripts. Each script has:
- `category` — one of the four product lines
- `opening` — the cold call opener
- `discoveryQuestions` — array of questions
- `transition` — bridge to the pitch
- `close` — closing statement
- `rebuttals` — array of `{ objection, response }` pairs

---

## Need Help?

Common issues:
- **Leaderboard shows error**: Double-check your CSV URL in `.env.local` and make sure the sheet is published
- **AI features don't work**: Verify your `ANTHROPIC_API_KEY` in `.env.local`
- **Port 3000 in use**: Run `npm run dev -- -p 3001` to use port 3001
