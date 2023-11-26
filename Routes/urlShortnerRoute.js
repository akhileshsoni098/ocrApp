const express = require("express")

const { createurl, geturl } = require("../controllers/urlShortnerCtrl")

const router = express.Router()

router.route("/urlShortner").post(createurl)

router.route("/:urlCode").get(geturl)



module.exports = router