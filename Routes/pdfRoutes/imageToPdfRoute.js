/*  const express = require("express");

const { imageToPdf } = require("../../controllers/pdfControllers/imageToPdf");

const router = express.Router()

router.route('/imageToPDF').post(imageToPdf);

module.exports = router 
 */


const express = require("express")
const { imageToPdf } = require("../../controllers/pdfControllers/imageToPdf");

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router()

router.route('/imageToPDF')
  .post(upload.array('images', 10), imageToPdf);



  
module.exports = router