const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');
const multer = require('multer');
const path = require('path');
const app = express();
app.use(bodyParser.json());
const audioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'audios'); // Set the destination folder for audio files
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '.mp3');
    },
  });
  app.use(multer({ storage: audioStorage}).single('audio'));
  app.use('/audios', express.static(path.join(__dirname, 'audios')));
  const AudioRoute = require('./routes/audio');
  app.use(AudioRoute);
mongoose.connect('mongodb+srv://admin:YNn6x41lUeGt1hFI@bookish.wyns0ux.mongodb.net/bookish').then(
    results =>
    {
    app.listen(3000);
    }
).catch(err =>
    {
        console.log(err);
});