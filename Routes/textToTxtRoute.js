const express = require("express")
const { textTotxt } = require("../controllers/changeIntoTxt")


const router = express.Router()


router.route("/textTotxt").post(textTotxt)

module.exports = router 