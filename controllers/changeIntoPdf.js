
const PDF = require("pdfkit");

const fs = require("fs");

exports.TextToPdf = async (req, res)=>{
    try {
        const { text } = req.body;
    
        const pdfDoc = new PDF();
        pdfDoc.text(text);
        
        // Set response headers for PDF download
        res.setHeader('Content-Disposition', 'attachment; filename=SampleDocument.pdf');
        res.setHeader('Content-Type', 'application/pdf');
    
        pdfDoc.pipe(res);
        pdfDoc.end();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
