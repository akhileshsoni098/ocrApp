const express = require("express")
const { ocrImageToText, ocrImageToTextUrl, qrGenrator, urlToqrGenrator, generateQrCode, imageUrlToQr } = require("../controllers/ocrCtrl")
const { createurl, geturl } = require("../controllers/urlShortnerCtrl")



const router = express.Router()

router.route("/imageToText").post(ocrImageToText)

router.route("/imageToTextUrl").post(ocrImageToTextUrl)

router.route("/qrGenrator").get(qrGenrator)

router.route("/imageToQr").post(generateQrCode)

router.route("/imageUrlToQr").post(imageUrlToQr)


router.route("/urlShortner").post(createurl)

router.route("/:urlCode").get(geturl)



module.exports = router

