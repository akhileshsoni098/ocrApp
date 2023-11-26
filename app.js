
credentials = require('./middi/credentials.js');
// const corsOptions = require('./config/corsOptions.js');
const express =require("express")
const fileUpload = require('express-fileupload');
const cloudinary = require("cloudinary").v2;
const cors = require("cors")
const app = express()

 
app.use(fileUpload({
    useTempFiles:true
}))
 

app.use(express.json())


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

app.use("/shortner", userUrlShortner)

app.use("/ocr", ocr)



module.exports = app