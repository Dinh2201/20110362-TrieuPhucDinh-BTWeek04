
// const http = require('http');
// const { URL } = require('url');

// const PORT = 5000;

// const myGroup = [
//   { id: '20110362', name: 'Trieu Phuc Dinh' },
//   { id: '20110426', name: 'Nguyen Minh Hung' },
//   { id: '20110376', name: 'Truong Chi Kien' },
// ];

// const server = http.createServer((req, res) => {
//   const { method } = req;
//   const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
//   const { pathname } = parsedUrl;

//   if (method === 'GET' && pathname === '/') {
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(myGroup));
//   } else if (method === 'GET' && pathname.startsWith('/message/')) {
//     const id = pathname.split('/')[2];

//     if (id) {
//       const person = myGroup.find((p) => p.id === id);
//       if (person) {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'text/html');
//         res.end(`<html><body><ul><li>${person.name}</li></ul></body></html>`);
//       } else {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end('Not valid');
//       }
//     } else {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'text/html');
//       let message = '<html><body><ul>';
//       myGroup.forEach((person) => {
//         message += `<li>${person.name}</li>`;
//       });
//       message += '</ul></body></html>';
//       res.end(message);
//     }
//   } else if (method === 'GET' && pathname.startsWith('/MSSV/')) {
//     const id = pathname.split('/')[2];
//     if (id) {
//       const person = myGroup.find((p) => p.id === id);
//       if (person) {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify(person));
//       } else {
//         res.statusCode = 404;
//         res.setHeader('Content-Type', 'application/json');
//         res.end(JSON.stringify({ error: 'not valid' }));
//       }
//     } else {
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/json');
//       res.end(JSON.stringify(myGroup.map(person => person.name)));
//     }
//   } else if (method === 'POST' && pathname.startsWith('/MSSV/')) {
//     const id = pathname.split('/')[2];

//     let body = '';

//     req.on('data', (chunk) => {
//       body += chunk.toString();
//     });

//     req.on('end', () => {
//       try {
//         const item = JSON.parse(body);
//         if (myGroup.some((p) => p.id === item.id)) {
//           res.statusCode = 400;
//           res.setHeader('Content-Type', 'text/plain');
//           res.end('Not valid');
//         } else {
//           myGroup.push(item);
//           res.statusCode = 200;
//           res.setHeader('Content-Type', 'application/json');
//           res.end(JSON.stringify(item));
//         }
//       } catch (error) {
//         res.statusCode = 400;
//         res.setHeader('Content-Type', 'text/plain');
//         res.end(error.toString());
//       }
//     });
//   } else {
//     res.statusCode = 404;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Not valid');
//   }
// });


// server.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/`);
// });

const express = require('express');
const app = express();
const PORT = 5000;

const myGroup = [
  { id: '20110362', name: 'Trieu Phuc Dinh' },
  { id: '20110426', name: 'Nguyen Minh Hung' },
  { id: '20110376', name: 'Truong Chi Kien' },
];

// Middleware to parse JSON request body
app.use(express.json());

// Controller for <MSSV> endpoint
app.get('/MSSV/:id', (req, res) => {
  const id = req.params.id;
  const person = myGroup.find(p => p.id === id);

  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({ error: 'Not valid' });
  }
});

// Controller for index (endpoint /)
app.get('/', (req, res) => {
  res.json(myGroup);
});

// Controller for message
app.get('/message/:id', (req, res) => {
  const id = req.params.id;
  const person = myGroup.find(p => p.id === id);

  if (person) {
    res.send(`<html><body><ul><li>${person.name}</li></ul></body></html>`);
  } else {
    res.status(404).send('Not valid');
  }
});

app.post('/MSSV/:id', (req, res) => {
  const id = req.params.id;
  const item = req.body;

  if (myGroup.some(p => p.id === id)) {
    res.status(400).send('Not valid');
  } else {
    myGroup.push(item);
    res.status(200).json(item);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
