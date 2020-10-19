const app = require('express')();
const bodyParser = require('body-parser');
const download = require('./downloader');

const { PORT, ROUTE, CDN } = require('./settings.json');

// Express Setup
app.use(bodyParser.json());

// Routes
app.get(`${ROUTE}/`, (req, res) => res.status(200).send(`
To use this YouTube mp3 downloader do a POST to this url with a json body:
{
    "id": "YOUTUBE_ID"
}
`));

app.post(`${ROUTE}/`, async (req, res) => {
    await download(req.body.id);
    res.status(200).json({
        link: `${CDN}/${req.body.id}.mp3`
    });
});

// Start server
app.listen(8080, () => console.log(`Listening on http://localhost:${PORT}`))