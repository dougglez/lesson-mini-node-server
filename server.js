//-----------------------REQUIRE MODULES-------------------------\\

const express = require('express');
const bodyParser = require('body-parser');

//-----------------------SERVER SETUP-------------------------\\
const PORT = 3000;
const app = express();
app.use(bodyParser.json());

const USERS = require('./users.js');

//----------------------ENDPOINTS--------------------------\\

app.get('/api/users', function(req, res) {
  console.log('returning data')
  res.status(200).send(USERS)
});

app.get('/api/users/:id', function(req, res) {
  console.log("returning 1 user's data");
  let id = req.params.id;
  let user = USERS.filter(v => v.id == id);
  res.status(200).send(user);
});


app.post('/api/users', function(req, res) {
  USERS.push(req.body);
  let newUser = USERS[USERS.length - 1]
  res.status(200).send(newUser);
});


app.put('/api/users/:id', function(req, res) {
  for (let i = 0; i < USERS.length; i++) {
    if (USERS[i].id == req.params.id) {
      USERS[i] = req.body;
      var user = USERS[i];
    }
  }
  console.log(USERS);
  res.status(200).send(user);
});


//-----------------------SERVER LISTEN-------------------------\\
app.listen(PORT, function() {
  console.log('App running successfully on', PORT);
});