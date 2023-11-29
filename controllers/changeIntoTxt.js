
const fs = require('fs');


exports.textTotxt = async (req, res) => {
   try{
   
    const { text } = req.body;
    if(!text){
        return res.status(400).json({status:false , mesage:"Please Provide some text"})
    }
    res.setHeader('Content-Disposition', 'attachment; filename=textFile.txt');
    res.setHeader('Content-Type', 'text/plain');
  
    res.send(text);
   }catch(err){
    res.status(500).json({status:false , message:err.message})
   }
}

