# ClipKar

Pick a topic, an art style and a length. ClipKar writes the script (Gemini), records the voiceover (Google Text-to-Speech), times the captions (AssemblyAI), illustrates each scene (Replicate) and plays it back as a 9:16 short (Remotion).

## Setup

Requires Node 22 (`nvm use`).

```bash
npm install
cp .env.example .env.local   # fill in every key
npm run db:push              # create the Postgres tables
npm run dev
```

### Services

| Step | Service | Env vars |
| --- | --- | --- |
| Auth | Clerk | `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` |
| Database | Neon Postgres | `DATABASE_URL` |
| Script | Google Gemini | `GEMINI_API_KEY`, optional `GEMINI_MODEL` |
| Voiceover | Google Cloud Text-to-Speech | `TTS_API_KEY` |
| Captions | AssemblyAI | `ASSEMBLY_AI_API_KEY` |
| Images | Replicate | `REPLICATE_API_KEY` |
| File storage | Firebase Storage (Admin SDK) | `FIREBASE_SERVICE_ACCOUNT`, `FIREBASE_STORAGE_BUCKET` |

Replicate, AssemblyAI and Text-to-Speech need billing enabled.

### Firebase Storage rules

Uploads go through the Admin SDK on the server, and playback uses token download URLs, so clients never need direct access. Lock the bucket down:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
```

## Deploying to Vercel

Add every variable from `.env.example` under Project → Settings → Environment Variables, then redeploy.
