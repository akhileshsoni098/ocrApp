
const imgToPDF = require('image-to-pdf');

const fs = require('fs');

const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

  exports.imageToPdf = (req, res) => {
    try {
        const files = req.files;
console.log(files)
        if (!files || files.length === 0) {
          return res.status(400).json({ error: 'No image files provided for conversion.' });
        }
    
      
        const imageBuffers = files.map((file) => file.buffer);
    
       
        const paperSize = req.body.paperSize || imgToPDF.sizes.A4;
    
    
        const pdfStream = imgToPDF(imageBuffers, paperSize);
    
      
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.setHeader('Content-Type', 'application/pdf');
    
      
        pdfStream.pipe(res);
      } catch (error) {
        console.error('PDF conversion error:', error);
        res.status(500).json({ error: 'An error occurred during conversion.' });
      }
    }
  
 


