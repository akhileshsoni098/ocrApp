
const cloudinary = require("cloudinary").v2;
const Tesseract = require('tesseract.js');
const qr = require('qrcode');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

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



///////
 


exports.ocrImageToTextUrl = async (req, res) => {
    try {
       
const data = req.body
 
            Tesseract.recognize(
                `${data.url}`,
                'eng',
                { logger: m => console.log(m) }
            ).then(({ data: { text } }) => {
                console.log(text);

                // Send the extracted text as a response
                res.status(200).json({ status: true, message: "success", data: text });
            });
       
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
}





exports.qrGenrator = async (req, res) => {
try{

    const data = req.body

    const url = data.url; 

    qr.toFile(path.join(__dirname, 'qrcode.png'), url, (err) => {
      if (err) {
        return res.status(500).json({ status: false, message: err.message });
      }

      res.sendFile(path.join(__dirname, 'qrcode.png'));
      console.log('QR code generated successfully!');
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};



exports.generateQrCode = async (req, res) => {
    try {
        if (req.files && req.files.imageOcr) {
            const imageFile = req.files.imageOcr;

            const result = await cloudinary.uploader.upload(
                imageFile.tempFilePath,
                {
                    resource_type: "image",
                    folder: "images",
                }
            )

            // Define the URL where the image will be accessible
            const imageUrl =`${result.secure_url}`;

            qr.toFile(path.join(__dirname, 'qrcode.png'), imageUrl, (err) => {
                if (err) {
                    return res.status(500).json({ status: false, message: "Failed to generate QR code" });
                }

                res.sendFile(path.join(__dirname, 'qrcode.png'));
                console.log('QR code generated successfully!');
            });
        } else {
            res.status(400).json({ status: false, message: "No image file provided" });
        }
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};




exports.imageUrlToQr = async (req, res)=>{
    try {
    const data = req.body

    const imageUrl = data.url

    qr.toFile(path.join(__dirname, 'qrcode.png'), imageUrl, (err) => {
        if (err) {
            return res.status(500).json({ status: false, message: "Failed to generate QR code" });
        }

        res.sendFile(path.join(__dirname, 'qrcode.png'));
        console.log('QR code generated successfully!');
    });
} catch (err) {
    res.status(500).json({ status: false, message: err.message });
}

    }
