
const PDF = require("pdfkit");

exports.textToPdf = async (req, res)=>{
    try {
        const { text } = req.body;
        if(!text){
            return res.status(400).json({status:false , mesage:"Please Provide some text"})
        }
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
    
