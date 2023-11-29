const express = require("express")
const {  textToPdf } = require("../controllers/changeIntoPdf")

const router = express.Router()


router.route("/textTopdf").post(textToPdf)

module.exports = router  