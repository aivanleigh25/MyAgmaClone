const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ws = new WebSocket('ws://localhost:8080');

let state = { players: {}, foods: [], viruses: [], powerups: [] };
let myId;

ws.onmessage = msg => {
    state = JSON.parse(msg.data);
    if (!myId) myId = Object.keys(state.players)[0]; // naive first player ID
};

document.addEventListener('mousemove', e => {
    ws.send(JSON.stringify({ action: 'move', x: e.clientX, y: e.clientY }));
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw foods
    ctx.fillStyle = 'yellow';
    state.foods.forEach(f => ctx.beginPath(), ctx.arc(f.x, f.y, f.size, 0, 2*Math.PI), ctx.fill());

    // Draw viruses
    ctx.fillStyle = 'green';
    state.viruses.forEach(v => ctx.beginPath(), ctx.arc(v.x, v.y, v.size, 0, 2*Math.PI), ctx.fill());

    // Draw powerups
    ctx.fillStyle = 'blue';
    state.powerups.forEach(p => ctx.beginPath(), ctx.arc(p.x, p.y, 5, 0, 2*Math.PI), ctx.fill());

    // Draw players
    for (let id in state.players) {
        const p = state.players[id];
        ctx.fillStyle = id == myId ? 'red' : 'white';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2*Math.PI);
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.fillText(p.name, p.x - 10, p.y - p.size - 5);
    }

    requestAnimationFrame(draw);
}

draw();
