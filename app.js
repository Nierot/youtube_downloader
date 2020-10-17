const app = require('express')();
const bodyParser = require('body-parser');
const download = require('./downloader');

const { PORT, ROUTE } = require('./settings.json');

// Express Setup
app.use(bodyParser.json());

// Routes
app.get(`${ROUTE}/`, (req, res) => res.status(200).send('YouTube Downloader'));

app.post(`${ROUTE}/download`, async (req, res) => {
    await download(req.body.id)
    res.status(200).send('ok');
});

// Start server
app.listen(8080, () => console.log(`Listening on http://localhost:${PORT}`))