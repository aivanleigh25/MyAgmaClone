const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

// Serve static files from public folder
app.use(express.static('public'));

// WebSocket server
const wss = new WebSocket.Server({ server });

let players = {};
let foods = [];
let viruses = [];
let powerups = [];

// Spawn entities
for (let i = 0; i < 200; i++) foods.push({ x: Math.random()*2000, y: Math.random()*2000, size: 5 });
for (let i = 0; i < 20; i++) viruses.push({ x: Math.random()*2000, y: Math.random()*2000, size: 30 });
for (let i = 0; i < 20; i++) powerups.push({
    x: Math.random()*2000,
    y: Math.random()*2000,
    type: Math.random() > 0.5 ? 'speed' : 'mass'
});

// Game loop
function gameLoop() {
    for (let id in players) {
        const p = players[id];

        // Food collision
        foods = foods.filter(f => {
            const dx = p.x - f.x, dy = p.y - f.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < p.size) { p.size += 0.2; return false; }
            return true;
        });

        // Powerup collision
        powerups = powerups.filter(pu => {
            const dx = p.x - pu.x, dy = p.y - pu.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < p.size) {
                if (pu.type === 'speed') p.speedBoost = 200;
                if (pu.type === 'mass') p.size += 2;
                return false;
            }
            return true;
        });
    }

    // Broadcast state
    const state = JSON.stringify({ players, foods, viruses, powerups });
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) client.send(state);
    });
}

// Run 20 times per second
setInterval(gameLoop, 50);

wss.on('connection', ws => {
    const id = Date.now();
    players[id] = { x: 100, y: 100, size: 10, skin: 'default', name: `Player${id}`, speedBoost: 0 };

    ws.on('message', msg => {
        const data = JSON.parse(msg);
        if (data.action === 'move') {
            players[id].x = data.x;
            players[id].y = data.y;
        }
        if (data.action === 'split') { /* Add splitting logic */ }
        if (data.action === 'eject') { /* Add eject logic */ }
        if (data.action === 'changeSkin') players[id].skin = data.skin;
    });

    ws.on('close', () => delete players[id]);
});

// Start server
server.listen(PORT, () => console.log(`Server running at http://0.0.0.0:${PORT}`));
