const express = require("express");
const router = express.Router();
const { mergePdfs } = require("../../controllers/pdfControllers/mergePdf");

// Route for merging PDFs
router.post('/merge', mergePdfs);

module.exports = router;