/* eslint-disable no-unused-expressions */
const multer = require('multer');

const storage = multer.diskStorage({
  // eslint-disable-next-line object-shorthand
  destination: function (req, file, callback) {
    callback(null, 'public/uploads');
  },

  // eslint-disable-next-line object-shorthand
  filename: function (req, file, callback) {
    file ? callback(null, file.originalname) : 'null';
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    return callback(null, true);
    // eslint-disable-next-line no-else-return
  } else {
    return callback({ message: 'Unsupported File Format' }, false);
  }
};

const upload = multer({
  // eslint-disable-next-line object-shorthand
  storage: storage,
  // eslint-disable-next-line object-shorthand
  fileFilter: fileFilter,
});

const uploadFile = upload.array('imgUrl', 500);
const uploadSingleFile = upload.single('imgSlider');

module.exports = {
  uploadFile,
  uploadSingleFile,
};
