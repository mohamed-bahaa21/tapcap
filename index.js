const path = require('path');
const express = require('express');
const app = express();

let LOCAL_STATIC_FILES_DIR = path.join(__dirname, 'public');

app.set('view engine', 'ejs');
app.use(express.static(LOCAL_STATIC_FILES_DIR));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000, () => console.log('Listening on port: 3000'));