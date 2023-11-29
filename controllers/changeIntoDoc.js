
const officegen = require("officegen")

exports.textToDoc = async (req, res) => {
    try {
        const { text } = req.body;
    
        if(!text){
            return res.status(400).json({status:false , mesage:"Please Provide some text"})
        }

        // Create a DOCX document
        const docx = officegen('docx');
        const pObj = docx.createP();
        pObj.addText(text);
    
        // Set response headers for the DOCX download
        res.attachment('SampleDocument.docx');
    
        // Stream the DOCX file to the response
        docx.generate(res);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    
}
