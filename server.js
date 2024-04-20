const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = process.env.PORT || 5000;

const MAX_RECURSION_DEPTH = 10; // Adjust as needed

const wikipediaLoop = async (url, visitedPages = [], requestCount = 0) => {
  if (requestCount >= MAX_RECURSION_DEPTH) {
    return { visitedPages, requests: requestCount };
  }
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Implement logic to extract the first link from main body text (excluding references, navigation elements)

    const nextUrl = /* logic to get the first valid link */;
    if (nextUrl === 'Philosophy') {
      return { visitedPages: [...visitedPages, nextUrl], requests: requestCount + 1 };
    } else {
      const loopResult = await wikipediaLoop(nextUrl, [...visitedPages, url], requestCount + 1);
      return loopResult;
    }
  } catch (error) {
    console.error(error);
    return { visitedPages, requests: requestCount };
  }
};

app.post('/analyze', async (req, res) => {
  const { url } = req.body;
  try {
    const loopResult = await wikipediaLoop(url);
    res.json(loopResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
