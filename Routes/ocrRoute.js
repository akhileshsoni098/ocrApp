 const express = require("express");
const router = express.Router();
const { ocrImageToText, ocrImageUrlToText, urlToQrGenrator, generateImageToQrCode, textToQrGenrator } = require("../controllers/ocrCtrl");



router.route("/imageToText").post(ocrImageToText)

router.route("/imageUrlText").post(ocrImageUrlToText)

router.route("/urlToGenrator").post(urlToQrGenrator)

router.route("/imageToQr").post(generateImageToQrCode)

router.route("/textToQr").post(textToQrGenrator)


// no need of this already converting url to qr so doesn't matter all urlconverting into pdf

// router.route("/imageUrlToQr").post(imageUrlToQr)

module.exports = router


