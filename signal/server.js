// Snake Clash — dedicated PeerJS signaling server.
// Hosts the WebRTC handshake (room codes) so the game no longer depends on the
// free public PeerJS broker. Deploy on any Node host (Render/Railway/Glitch...).
const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = process.env.PORT || 9000;

// Health check / friendly landing (Render pings "/")
app.get('/', (req, res) => res.type('text').send('Snake Clash signaling server: OK'));

const server = app.listen(PORT, () => console.log('Signaling server listening on port ' + PORT));

// PeerJS server mounted at /peerjs  → clients connect with path:'/peerjs'
const peerServer = ExpressPeerServer(server, {
  path: '/',
  allow_discovery: false,
  // generous timeouts so brief network blips don't drop the room
  alive_timeout: 60000,
  expire_timeout: 60000,
});
app.use('/peerjs', peerServer);

peerServer.on('connection', (client) => console.log('peer connected:', client.getId()));
peerServer.on('disconnect', (client) => console.log('peer disconnected:', client.getId()));
