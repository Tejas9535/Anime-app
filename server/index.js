const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 8080;

app.get('/api/scrape', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.zoro.to');
        const data = await page.evaluate(() => {
            return document.querySelector('body').innerText;
        });
        await browser.close();
        res.json({data});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

app.listen(port);
console.log(`Server started at http://localhost:${port}`);
