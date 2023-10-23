const express = require("express")
const { ocrImageToText, ocrImageToTextUrl, qrGenrator, urlToqrGenrator, generateQrCode, imageUrlToQr } = require("../controllers/ocrCtrl")



const router = express.Router()

router.route("/imageToText").post(ocrImageToText)

router.route("/imageToTextUrl").post(ocrImageToTextUrl)

router.route("/qrGenrator").get(qrGenrator)

router.route("/imageToQr").post(generateQrCode)

router.route("/imageUrlToQr").post(imageUrlToQr)

module.exports = router

