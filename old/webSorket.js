const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (ws) => {

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // 广播收到的消息给所有客户端
        server.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.send('Welcome to WebSocket server!');
});

