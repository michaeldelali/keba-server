var express = require('express');
var router = express.Router();

var menu = require('../controllers/menuController');
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
console.log("upload: ", upload)


router.get('/',menu.getAllMenu);
router.get('/getMenu', menu.getMenu);
router.post('/addMenu',upload.single('file'), menu.addMenu);
router.put('/updateMenu', menu.updateMenu);
router.delete('/deleteMenu', menu.deleteMenu);


module.exports = router;