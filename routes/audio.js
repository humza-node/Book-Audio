const express = require('express');
const AudioControll = require('../controllers/audio');
const router= express.Router();
router.post('/add-audio',AudioControll.addAudio);
router.get('/download-audio/:audioId', AudioControll.downloadAudio);
router.put('/update-audio/:audioId', AudioControll.updateAudio);
router.delete('/delete-audio/:audioId', AudioControll.deleteAudio);
module.exports = router;