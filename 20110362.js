
const express = require('express');
const app = express();
const { URL } = require('url');

const PORT = 5000;

const myGroup = [
  { id: '20110362', name: 'Trieu Phuc Dinh' },
  { id: '20110426', name: 'Nguyen Minh Hung' },
  { id: '20110376', name: 'Truong Chi Kien' },
];

const logRequest = (req) => {
  const { method, url } = req;
  console.log(`Received a ${method} request for ${url}`);
}

const handleMSSV = (req, res) => {
  const id = req.params.id;

  const person = myGroup.find((p) => p.id === id);
  if (person) {
    res.status(200).json(person);
  } else {
    res.status(404).json({ error: 'Not valid' });
  }
}

const handleIndex = (req, res) => {
  let message = '<html><body><ul>';
  myGroup.forEach((person) => {
    message += `<li>${person.name}</li>`;
  });
  message += '</ul></body></html>';
  res.status(200).send(message);
}

const handleMessage = (req, res) => {
  const id = req.params.id;

  if (id)  {
    const person = myGroup.find((p) => p.id === id);
    if (person) {
      res.status(200).send(`<html><body><ul><li>${person.name}</li></ul></body></html>`);
    } else {
      res.status(404).send('Not valid');
    }
  }
}

// Định nghĩa các route
app.get('/', (req, res) => {
  logRequest(req);
  res.status(200).json(myGroup);
});

app.get('/MSSV/:id', (req, res) => {
  logRequest(req);
  handleMSSV(req, res);
});

app.get('/message/:id', (req, res) => {
  logRequest(req);
  handleMessage(req, res);
});
app.get('/message', (req, res) => {
  logRequest(req);
  let message = '<html><body><ul>';
  myGroup.forEach((person) => {
    message += `<li>${person.name}</li>`;
  });
  message += '</ul></body></html>';
  res.status(200).send(message);
});

app.get('/MSSV', (req, res) => {
  logRequest(req);
  res.status(200).json(myGroup.map(person => person.name));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
