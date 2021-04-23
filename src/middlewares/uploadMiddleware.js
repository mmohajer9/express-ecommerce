const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const user = req.user;
    const dir = path.join('./public/uploads/images/', user.username);
    mkdirp(dir).then((made) => cb(null, dir));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const imageFilter = (req, file, cb) => {
  switch (file.mimetype) {
    case 'image/png':
      cb(null, true);
      break;
    case 'image/jpeg':
      cb(null, true);
      break;
    case 'image/jpg':
      cb(null, true);
      break;
    default:
      cb(null, false);
      break;
  }
};

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: imageFilter,
});

module.exports = { imageUpload };
