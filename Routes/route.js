const express = require("express")
const { ocrImageToText } = require("../controllers/ocrCtrl")



const router = express.Router()

router.route("/imageToText").post(ocrImageToText)

module.exports = router

