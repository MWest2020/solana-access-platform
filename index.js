const express = require('express');
const { Connection, PublicKey } = require('@solana/web3.js');
const Course = require('./Course.js');
const Owner = require('./Owner.js');
const Resell = require('./Resell.js');
const AdjustProfit = require('./AdjustProfit.js');

const app = express();
const port = process.env.PORT || 5000;

// Connect to Solana devnet
const connection = new Connection('https://api.devnet.solana.com');

app.use(express.json());

// Endpoint to mint a new course
app.post('/mint', async (req, res) => {
  const { courseName, ownerPublicKey, price } = req.body;
  const course = new Course(connection, courseName, ownerPublicKey, price);
  const result = await course.mint();
  res.send(result);
});

// Endpoint to buy a course
app.post('/buy', async (req, res) => {
  const { coursePublicKey, buyerPublicKey } = req.body;
  const resell = new Resell(connection, coursePublicKey, buyerPublicKey);
  const result = await resell.buy();
  res.send(result);
});

// Endpoint to adjust profit percentage
app.post('/adjust-profit', async (req, res) => {
  const { ownerPublicKey, newProfitPercentage } = req.body;
  const adjustProfit = new AdjustProfit(connection, ownerPublicKey, newProfitPercentage);
  const result = await adjustProfit.adjust();
  res.send(result);
});

// Endpoint to get course details
app.get('/course/:publicKey', async (req, res) => {
  const coursePublicKey = new PublicKey(req.params.publicKey);
  const course = new Course(connection, '', '', 0, coursePublicKey);
  const result = await course.getDetails();
  res.send(result);
});

// Endpoint to get owner details
app.get('/owner/:publicKey', async (req, res) => {
  const ownerPublicKey = new PublicKey(req.params.publicKey);
  const owner = new Owner(connection, '', ownerPublicKey);
  const result = await owner.getDetails();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
