const multer = require('multer');

// const upload = multer({ dest: 'dist/' });

const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});

const upload = multer({ storage });

module.exports = upload;

// const handleFileUpload = (name) => {
//     return (req, res, next) => {
//         return upload.single(name).catch((error) => next (error));
//     };
// };

// module.exports = handleFileUpload;
