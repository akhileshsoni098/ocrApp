const express = require("express");
const fileUpload = require("express-fileupload");
const router = express.Router();
const { mergePdfs } = require("../../controllers/pdfControllers/mergePdf");

router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: 'uploads/' // Define the directory for temporary file storage
}));
// Route for merging PDFs
router.post('/merge', mergePdfs);

module.exports = router;