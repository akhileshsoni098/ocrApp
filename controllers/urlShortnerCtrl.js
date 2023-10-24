const shortUrlModel=require("../models/shorltUrlModel.js")
const validator=require("validator")
const baseUrl="http://localhost:3001";

const shortid=require("shortid")


 
///------------post api--------------------------------
exports.createurl=async function(req,res){
    try {
        //--------------if no data is provided in a body-----------------------------------------
        let data = req.body;
        if (Object.keys(data).length == 0) {
          return res.status(400).send({ status: false, message: "provide some input of longUrl" })
        }
        if (Object.keys(data).length != 1) {
          return res.status(400).send({ status: false, message: "body only accept longUrl key" });
          }
    
        //------------checking whether the key name is longUrl or not--------------------
        let longUrl = data.longUrl;
        if (!longUrl)
          return res.status(400).send({ status: false, msg: "please provide key longUrl" });
        //-----------checking whether type of longUrl is string or not--------------
        if (typeof longUrl != "string") {
          return res.status(400).send({status: false,message: "Please provide url in a string format "});
        }
        //------------checking whetther longUrl is valid or not---------------------
    let validUrl = validator.isURL(longUrl.trim());
    if (!validUrl) {
     return res.status(400).send({ status: false, message: "Not a Valid Url" });
    }
    //---------if short url is not generated yet with this long url then we are generating short url----------
    let urlCode = shortid.generate(longUrl);

    let shortUrl = baseUrl + "/" + urlCode.toLowerCase();
    const url = {
      longUrl: longUrl,
      urlCode: urlCode.toLowerCase(),
      shortUrl: shortUrl
    };
    const saveShorturl = await shortUrlModel.create(url)
    return  res.status(201).send({status: true,data: saveShorturl});
  } catch (error) {
    return res.status(500).send({ msg: error.message});
}
}



//--------------------------- get api----------------------------------- 
exports.geturl = async function(req,res){
  try{

  let urlCode=req.params.urlCode

  //------checking whether codeUrl in  path params is provide or not------------ 
  if(!urlCode) return res.status(400).send({status:false,message:"please Enter a codeUrl in params"});

//---------checking whether codeUrl is valid or not-------------
  let validCodeUrl=shortid.isValid(urlCode)
  if(!validCodeUrl) {
  return res.status(400).send({status:false,message:"please Enter a valid CodeUrl"})

}
     
          let longUrlData= await shortUrlModel.findOne({urlCode:urlCode}).select({longUrl:1,_id:0})

          console.log(longUrlData)

          if(!longUrlData) {
          return res.status(404).send({status:false,message:"Url not found"})
}

          return res.status(302).redirect(longUrlData["longUrl"])
          
      
  
  }catch(error){
     return res.status(500).send({status:false,msg:error.message})

  }  
    
}
