const express = require("express")
const { TextToPdf } = require("../controllers/changeIntoPdf")

const router = express.Router()


router.route("/textTopdf").post(TextToPdf)

module.exports = router