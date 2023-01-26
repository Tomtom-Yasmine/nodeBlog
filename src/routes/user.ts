import express from 'express'

const app = express.Router()

app.get('/grant', (req, res) => {
  
});

app.get('/user', (req, res) => {
  res.status(200).json({ message: 'Hello user' });
});

export default app;
