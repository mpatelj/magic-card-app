import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
require('dotenv').config();

const app = express();
const port = 3001;
const SCRYFALL_API_URL = process.env.SCRYFALL_API_URL;

// Using the cors middleware
app.use(cors());

app.get('/cards/search', async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search string is required' });
    }
    const apiUrl = `${SCRYFALL_API_URL}/cards/search?q=${encodeURIComponent(q.toString())}`;
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cards:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});