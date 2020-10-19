const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const normalize = require('ffmpeg-normalize');
const { TEMP_FOLDER, OUTPUT_FOLDER } = require('./settings.json');
const { rejects } = require('assert');

const YT_BASE = 'https://youtube.com/watch?v=';

module.exports = async (id) => {
    if (fs.existsSync(`${OUTPUT_FOLDER}/${id}.mp3`)) return; // File already exists
    let extension = '';
    let vid = ytdl(YT_BASE + id, { filter: 'audioonly', quality: 'highestaudio' })
        .on('info', (info, format) => {
            vid.pipe(fs.createWriteStream(`${TEMP_FOLDER}/${id}.${format.codecs}`))
            convertToMP3(id, format.codecs);
        })
}

function convertToMP3(filename, extension) {
    ffmpeg(`${TEMP_FOLDER}/${filename}.${extension}`)
        .toFormat('mp3')
        .on('error', console.error)
        .on('end', () => {
            console.log(`Saved as ${filename}.mp3`);
            deleteTemp(filename, extension);
        })
        .save(`${OUTPUT_FOLDER}/${filename}.mp3`)
}

// Quality is absolute shit, so not in use right now.

// function normalizeFile(filename, extension) {
//     return new Promise((res, rej) => normalize({
//         input: `${TEMP_FOLDER}/${filename}.mp3`,
//         output: `${OUTPUT_FOLDER}/${filename}.mp3`,
//         loudness: {
//             normalization: 'ebuR128',
//             target: {
//                 input_i: -23,
//                 input_lra: 7.0,
//                 input_tp: -2.0
//             },
//             verbose: true
//         }
//     })
//     .then(d => {
//         console.log('Normalized file ' + filename)
//         deleteTemp(filename, extension, true);
//         res(d);
//     })
//     .catch(err => {
//         console.error(err);
//         rej(err);
//     }));
// }

function deleteTemp(file, extension) {
    console.log(`Deleting file ${file}`)
    let path = TEMP_FOLDER + '/' + file;
    try {
        fs.unlinkSync(path + '.' + extension);
    } catch (e) {
        console.error(e);
    }
}
