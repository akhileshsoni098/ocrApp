/* 

const path = require("path");
const fs = require('fs');
const PDFMerger = require('pdf-merger-js');

function createNewMerger() {
  return new PDFMerger();
}

const publicDirectory = path.join(__dirname, '../../public'); // Correcting path to 'public' directory
if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory);
}

exports.mergePdfs = async (req, res, next) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).send("Please upload at least two PDF files.");
    }

    const pdfPaths = req.files['pdfs'].map(file => file.tempFilePath); // Accessing tempFilePath

    console.log('PDF Paths:', pdfPaths);

    const newMerger = createNewMerger();

    for (const pdfPath of pdfPaths) {
      await newMerger.add(pdfPath);
    }
    
    const timestamp = new Date().getTime();
    const mergedPdfPath = path.join(publicDirectory, `${timestamp}_merged.pdf`);

    await newMerger.save(mergedPdfPath);

    res.download(mergedPdfPath, `merged_${timestamp}.pdf`, (err) => {
      if (err) {
        console.error("Error sending merged PDF:", err);
        res.status(500).json({ status: false, message: err.message });
      }
    });
  } catch (error) {
    console.error("Error merging PDFs:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

 
 */


const path = require("path");
const fs = require('fs');
const PDFMerger = require('pdf-merger-js');

function createNewMerger() {
  return new PDFMerger();
}

const publicDirectory = path.join(__dirname, '../../public'); // Correcting path to 'public' directory
if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory);
}


exports.mergePdfs = async (req, res, next) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).send("Please upload at least two PDF files.");
    }

    const pdfPaths = req.files['pdfs'].map(file => file.tempFilePath); // Accessing tempFilePath

    console.log('PDF Paths:', pdfPaths);

    const timestamp = new Date().getTime();
    const mergedPdfPath = path.join(publicDirectory, `${timestamp}_merged.pdf`);

    const newMerger = createNewMerger(); // Create a new instance of PDFMerger

    for (const pdfPath of pdfPaths) {
      const tempMerger = createNewMerger(); // Create a temporary merger for each PDF
      await tempMerger.add(pdfPath); // Add the current PDF to the temporary merger
      await newMerger.add(await tempMerger.saveAsBuffer()); // Merge the temporary merger into the main one
    }

    await fs.promises.writeFile(mergedPdfPath, await newMerger.saveAsBuffer()); // Save the merged PDF

    res.download(mergedPdfPath, `merged_${timestamp}.pdf`, (err) => {
      if (err) {
        console.error("Error sending merged PDF:", err);
        res.status(500).json({ status: false, message: err.message });
      } else {
        // Clean up merged file after download
        fs.unlinkSync(mergedPdfPath);
      }
    });
  } catch (error) {
    console.error("Error merging PDFs:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};
