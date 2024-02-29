const express = require('express');
const bodyParser = require('body-parser');
const categories = require('./router/categoriesRouter.js')
const app = express();
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/categories', categories);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});