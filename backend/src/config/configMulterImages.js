const multer = require("multer");

const storage = multer.diskStorage({
    /**
     * Sets the destination folder for the uploaded files.
     * @param {Object} req - The request object.
     * @param {Object} file - The uploaded file object.
     * @param {Function} cb - The callback function.
     */
    destination: function(req, file, cb) {
        cb(null, "./src/data/images");
    },
    /**
     * Sets the filename for the uploaded files.
     * @param {Object} req - The request object.
     * @param {Object} file - The uploaded file object.
     * @param {Function} cb - The callback function.
     */
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-convenio");
    },
});

/**
 * Filters the uploaded files based on their mimetype.
 * @param {Object} req - The request object.
 * @param {Object} file - The uploaded file object.
 * @param {Function} cb - The callback function.
 */
const fileFilter = function(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Solo se permite la subida de imagenes"), false);
    }
};

const uploadImg = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { uploadImg };
