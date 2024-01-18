const Audio = require('../models/audio');
const fs = require('fs');
const path = require('path');
const filehelper = require('../util/file');
exports.addAudio = async(req, res, next) =>
{
    const title = req.body.title;
    const audio = req.file.path.replace("\\","/");
    const bookId = req.body.bookId;
    const audios = new Audio(
        {
            title: title,
            audio: audio,
            bookId: bookId
        }
    );
    const results = await audios.save();
    res.status(200).json({message: "Audio Save", results});
};
exports.downloadAudio = async (req, res, next) => {
    try {
      const audioId = req.params.audioId;
      const audio = await Audio.findById(audioId);
  
      if (!audio) {
        return res.status(404).json({ message: 'Audio file not found' });
      }
  
      // Set the appropriate headers for the response
      res.setHeader('Content-Type', 'audio/mpeg'); // Set to 'audio/mpeg' for MP3 files
      res.setHeader('Content-Disposition', `attachment; filename=${audio.audio}`);
  
      // Convert the stored file path to an absolute path
      const filePath = path.join(__dirname, '..', audio.audio);
  
      // Stream the file content
      const stream = fs.createReadStream(filePath);
  
      // Pipe the file stream to the response stream
      stream.pipe(res);
  
      // Handle errors during the stream
      stream.on('error', (error) => {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      });
  
      // Handle the end of the stream
      stream.on('end', () => {
        // The download is complete
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  exports.updateAudio = async(req, res, next) =>
  {
    const audioId = req.params.audioId;
    const title = req.body.title;
    const audio = req.file.path.replace("\\","/");
    const bookId = req.body.bookId;
    Audio.findById(audioId).then(audios =>
        {
            if(!audios)
            {
                const error = new Error("Audio File Not Found");
                error.statusCode = 500;
                throw error;
            }
audios.title = title;
audios.bookId = bookId;
if(audio)
{
    filehelper.deletefile(audios.audio);
    audios.audio = audio;
}
const results = audios.save();
return res.status(200).json({message: "Audio Update", results});
        }).catch(err =>
            {
                if(!err.statusCode)
                {
                    err.statusCode=500;
                }
                next(err);
            });
  };
  exports.deleteAudio = async(req, res, next) =>
  {
    const audioId = req.params.audioId;
    Audio.findById(audioId).then(audios =>
        {
            if(!audios)
            {
                const error = new Error("Audio Not Found");
                error.statusCode = 500;
                throw error;
            }
            filehelper.deletefile(audios.audio);
          return Audio.findByIdAndDelete(audioId);
        }).then(results =>
            {
                res.status(200).json({message: "Audio Deleted", results});
            }).catch(err =>
                {
                    if(!err.statusCode)
                    {
                        err.statusCode = 500;
                    }
                });
  };
  exports.getAudio = async(req, res, next) =>
  {
    const audios = await Audio.find();
    res.status(200).json({message: "Audios", audios});
  };
 