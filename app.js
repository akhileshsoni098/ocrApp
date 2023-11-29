
credentials = require('./middi/credentials.js');
// const corsOptions = require('./config/corsOptions.js');
const express =require("express")
const path = require("path")
 const fileUpload = require('express-fileupload');
const cloudinary = require("cloudinary").v2;
const cors = require("cors")
const app = express()

 //need to manage multer and express file upload both for this project 

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: 'uploads/'
}))
  

app.use(express.json())

app.setMaxListeners(15)

app.use(cors({
  origin: "http://localhost:3000",
  
}))

// app.use(cors(corsOptions));

cloudinary.config({
    cloud_name: "decjoyrmj",
    api_key: "627647724186355",
    api_secret: "mw_DjfFMzfZ2pKOWv1hNyuP8T0A"
  });
   
//  for route

const userUrlShortner = require("./Routes/urlShortnerRoute.js")

const ocr = require("./Routes/ocrRoute.js")
const textTopdf = require("./Routes/textToPdfRoute.js")

const textToDoc = require("./Routes/textToDocRoute.js")

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.get('/textToPdf', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/textToPdf.html"));
});

app.get('/textToDoc', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/textToDoc.html"));
});


app.use("/shortner", userUrlShortner)

app.use("/ocr", ocr)

app.use("/pdf", textTopdf )

app.use("/doc", textToDoc )
 

module.exports = app 