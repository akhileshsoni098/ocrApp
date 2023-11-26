
const cloudinary = require("cloudinary").v2;

const qr = require('qr-image');

const { v4: uuidv4 } = require('uuid');

const Tesseract = require('tesseract.js');
// const qr = require('qrcode');
const fs = require('fs');
const path = require('path');
const multer = require('multer');


exports.ocrImageToText = async (req, res) => {

    try {

        if (req.files && req.files.ocrPic) {
            const ocrPicFile = req.files.ocrPic;
            console.log(ocrPicFile)
            const result = await cloudinary.uploader.upload(
                ocrPicFile.tempFilePath,
                {
                    resource_type: "image",
                    folder: "ocrPic",
                }
            ) 

console.log("working", result.secure_url)

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
 


exports.ocrImageUrlToText = async (req, res) => {
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






exports.urlToQrGenrator = async (req, res) => {
  try {
    const data = req.body;
    const url = data.url;

    const qrImage = qr.imageSync(url, { type: 'png' });
    
    const fileName = `qrcode_${uuidv4()}.png`; 

    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename=${fileName}`,
    });
    res.send(qrImage);

    console.log('QR code generated and sent for download successfully!');
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};



/* 

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
  */

/* 

exports.generateImageToQrCode = async (req, res) => {
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

 */

exports.generateImageToQrCode = async (req, res) => {
    try {
        if (req.files && req.files.imageOcr) {
            const imageFile = req.files.imageOcr;

            const result = await cloudinary.uploader.upload(
                imageFile.tempFilePath,
                {
                    resource_type: "image",
                    folder: "images",
                }
            );

            const imageUrl = result.secure_url;

            const qrImage = qr.imageSync(imageUrl, { type: 'png' });

            res.set({
                'Content-Type': 'image/png',
                'Content-Disposition': 'attachment; filename="qrcode.png"',
            });
            res.send(qrImage);

            console.log('QR code generated and sent for download successfully!');
        } else {
            res.status(400).json({ status: false, message: "No image file provided" });
        }
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};



exports.textToQrGenrator = async (req, res) => {
    try {
      const data = req.body;
      const text = data.text;
  
      const qrImage = qr.imageSync(text, { type: 'png' });
      
      const fileName = `qrcode_${uuidv4()}.png`; 
  
      res.set({
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename=${fileName}`,
      });
      res.send(qrImage);
  
      console.log('QR code generated and sent for download successfully!');
    } catch (err) {
      res.status(500).json({ status: false, message: err.message });
    }
  };
  




// no need of this already converting url to qr so doesn't matter all urlconverting into pdf

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
