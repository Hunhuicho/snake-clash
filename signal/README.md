# Snake Clash — Signaling Server

A tiny [PeerJS](https://peerjs.com/) signaling server so the online multiplayer (v3)
doesn't depend on the flaky free public broker. Players still connect **peer-to-peer**;
this server only does the initial handshake (room codes).

## Deploy on Render (free, GitHub login)

1. Go to <https://render.com> → **Sign in with GitHub** (use the Hunhuicho account).
2. **New +** → **Web Service**.
3. Connect the repository **`Hunhuicho/snake-clash`**.
4. Fill the form:
   - **Name:** `snake-clash-signal` (any name)
   - **Root Directory:** `signal`   ← important (the server lives in this subfolder)
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** **Free**
5. **Create Web Service** and wait for the first deploy (~2–3 min).
6. Copy the service URL, e.g. `https://snake-clash-signal.onrender.com`.
7. Send that URL back — it gets wired into `v3.html` so the game uses this server.

> Free tier note: the service sleeps after ~15 min idle and takes ~30–60 s to wake on
> the first connection. During active play it's instant. The game shows a
> "서버 깨우는 중" message and retries automatically during a cold start.

## Run locally (optional test)

```
cd signal
npm install
npm start
# → "Signaling server listening on port 9000"
```

The game would then use `{ host:'localhost', port:9000, path:'/peerjs', secure:false }`.
