require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const {connect} = require('./db-connection');

const app = express();

app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(bodyParser.json());

app.use(routes);

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    if (res.headersSent) {
      next(err);
    } else {
      res.status(500).send('An error occurred');
    }
  } else {
    next();
  }
});

connect().then(() => {
  const port = process.env.PORT || 5000;
  app.listen(port);
  
  console.log('App is listening on port ' + port);
});
