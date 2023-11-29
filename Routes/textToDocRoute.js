const express = require("express")
const { textToDoc } = require("../controllers/changeIntoDoc")

const router = express.Router()


router.route("/textToDoc").post(textToDoc)

module.exports = router