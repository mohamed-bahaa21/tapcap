const path = require('path');
const express = require('express');
const app = express();

const fs = require('fs');
const { parse, resync, stringify, parseTimestamp, formatTimestamp, stringifySync } = require('subtitle');

let LOCAL_STATIC_FILES_DIR = path.join(__dirname, 'public');

app.set('view engine', 'ejs');
app.use(
    express.static(LOCAL_STATIC_FILES_DIR),
    express.json({
        limit: '10mb'
    }),
    express.urlencoded({
        extended: true,
        limit: '10mb'
    }),
);

app.get('/', (req, res) => {
    res.render('landing');
})
app.get('/demo', (req, res) => {
    res.render('index');
})

const webvtt_subtitle_path = path.join(__dirname, 'public/captions/video.vtt')
const srt_subtitle_path = path.join(__dirname, 'public/captions/video.srt')

app.get('/read-webvtt', (req, res) => {

    fs.createReadStream(webvtt_subtitle_path)
        .pipe(parse())
        .pipe(stringify({ format: 'srt' }))
        .pipe(fs.createWriteStream(srt_subtitle_path))

    fs.readFile(webvtt_subtitle_path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data)
    });
})

app.get('/get-captions', (req, res) => {
    var list = [];
    fs.createReadStream(webvtt_subtitle_path)
        .pipe(parse())
        .on('data', node => {
            list.push(node)
        })
        .on('error', console.error)
        .on('finish', () => {
            res.send(list);
        })
})

app.post('/add-caption', (req, res) => {
    const { video_time, new_caption } = req.body;

    res.redirect('/demo')

    // var data = { time_milli: video_time, time_vtt: formatTimestamp(video_time), caption: new_caption };
    // console.log(data);

    // // convert to srt
    // // .pipe(stringify({ format: 'srt' }))
    // // .pipe(fs.createWriteStream(srt_subtitle_path))
    // // stringifySync(nodes, { format: 'WebVTT' })

    // let list = []

    // fs.createReadStream(webvtt_subtitle_path)
    //     .pipe(parse())
    //     .on('data', node => {
    //         list.push(node)
    //     })
    //     .on('error', console.error)
    //     .on('finish', () => {
    //         list.push({
    //             type: 'cue',
    //             data: {
    //                 start: video_time,
    //                 end: Number(video_time) + 5000,
    //                 text: new_caption
    //             }
    //         })

    //         let new_data = stringifySync(list, { format: 'WebVTT' })
    //         fs.createWriteStream(webvtt_subtitle_path).write(new_data);

    //         console.log('parser has finished')
    //     })

    // res.redirect('/demo');
})

app.get('/delete-caption/:id', (req, res) => {
    const { id } = req.params;

    var list = []

    fs.createReadStream(webvtt_subtitle_path)
        .pipe(parse())
        .on('data', node => {
            list.push(node)
        })
        .on('error', console.error)
        .on('finish', () => {
            // const index = list.indexOf(list[id]);
            const index = id;
            if (index > -1) { // only splice array when item is found
                list.splice(index, 1); // 2nd parameter means remove one item only
            }

            let new_data = stringifySync(list, { format: 'WebVTT' })
            fs.createWriteStream(webvtt_subtitle_path).write(new_data);
        })

    res.send(list[id]);

})

app.post('/update-captions', (req, res) => {
    const data = req.body;
    // res.send(data);
    res.redirect('/demo')

    // let old_nodes = [];
    // const keys = Object.keys(data);

    // fs.createReadStream(webvtt_subtitle_path)
    //     .pipe(parse())
    //     .on('data', node => {
    //         old_nodes.push(node)
    //     })
    //     .on('error', console.error)
    //     .on('finish', () => {

    //         for (let i = 0; i < keys.length; i++) {
    //             const ele = keys[i];
    //             old_nodes[ele].data.start = parseTimestamp(data[ele][0]);
    //             old_nodes[ele].data.end = parseTimestamp(data[ele][1]);
    //             old_nodes[ele].data.text = data[ele][2];
    //         }

    //         let new_data = stringifySync(old_nodes, { format: 'WebVTT' })
    //         fs.createWriteStream(webvtt_subtitle_path).write(new_data);
    //         res.redirect('/demo')
    //     })
})

app.listen(3000, () => console.log('Listening on port: 3000'));