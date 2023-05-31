
var express = require('express');
const path = require('path');
const multer = require('multer');

// configure multer to save uploaded files to the "Images" folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Images");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    // const ext = path.extname(file.originalname);
    // const filename = `${req.params.menuId}_${timestamp}${ext}`;
    const filename = file.originalname;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });


module.exports = function(req, res, next) {
    upload.any()(req, res, function(err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred during file upload
          console.log(err);
          return res.status(500).send('Error occurred while uploading files.');
        } else if (err) {
          // An unknown error occurred
          console.log(err);
          return res.status(500).send('Unknown error occurred while uploading files.');
        }
        
        // No error occurred, continue with the next middleware or route handler
        if (req.files.length === 0) {
          // No files were uploaded
          return res.status(400).send('No files were uploaded.');
        } else if (req.files.length === 1) {
          // Single file uploaded
        //   console.log(req.file);
        //   res.end('Your file uploaded.');
        } else {
          // Multiple files uploaded
        //   console.log(req.files);
        //   res.end('Your files uploaded.');
        }
       next();
      });
  };


