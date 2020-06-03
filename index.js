// server.js

// const WebSocket = require('ws')

// const wss = new WebSocket.Server({ port: 8080 })

// wss.on('connection', ws => {
//   ws.on('message', message => {
//     console.log(`Received message => ${message}`)
//   })
//   ws.send('Hello! Message From Server!!')
// })


// var net = require('net');
// var sockets = [];

// var svr = net.createServer(function(sock) {
//     console.log('Connected: ' + sock.remoteAddress + ':' + sock.remotePort);
//     sockets.push(sock);

//     sock.write('Welcome to the server!\n');

//     sock.on('data', function(data) {
//         for (var i=0; i<sockets.length ; i++) {
//             if (sockets[i] != sock) {
//                 if (sockets[i]) {
//                     sockets[i].write(data);
//                 }
//             }
//         }
//     });

//     // sock.on('end', function() {
//     //     console.log('Disconnected: ' + sock.remoteAddress + ':' + sock.remotePort);
//     //     var idx = sockets.indexOf(sock);
//     //     if (idx != -1) {
//     //         delete sockets[idx];
//     //     }
//     // });
// });

// var svraddr = '192.168.43.64';
// var svrport = 1234;

// svr.listen(svrport, svraddr);
// console.log('Server Created at ' + svraddr + ':' + svrport + '\n');

//new socket
const { Server } = require('ws');
const express = require('express');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.js';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);