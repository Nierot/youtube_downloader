const fs = require('fs');
const ytdl = require('ytdl-core');

const YT_BASE = 'https://youtube.com/watch?v=';

module.exports = async id => {
    await ytdl(YT_BASE + id, { filter: 'audioonly' })
        .pipe(fs.createWriteStream(id + '.mp3'))
}

function normalize(id) {
    //TODO
}