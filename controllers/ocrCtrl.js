
const cloudinary = require("cloudinary").v2;
const Tesseract = require('tesseract.js');

exports.ocrImageToText = async (req, res) => {
    try {
        if (req.files && req.files.ocrPic) {
            const ocrPicFile = req.files.ocrPic;
            const result = await cloudinary.uploader.upload(
                ocrPicFile.tempFilePath,
                {
                    resource_type: "image",
                    folder: "ocrPic",
                }
            )

            Tesseract.recognize(
                `${result.secure_url}`,
                'eng',
                { logger: m => console.log(m) }
            ).then(({ data: { text } }) => {
                console.log(text);

                // Send the extracted text as a response
                res.status(200).json({ status: true, message: "success", data: text });
            });
        } else {
            res.status(400).json({ status: false, message: "No profilePicture file provided" });
        }
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
}
