var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/submit_banner',upload.any() ,function(req, res, next) {
    try{
        var files=req.files.map((item)=>{
            return item.filename
          })
      
  
      pool.query("insert into banners (bannertype,brandid,picture) values(?,?,?)",[req.body.bannertype,req.body.brandid,files+""],function(error,result){
          if(error)
          
          {console.log(error)
            res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
          else
          {
              res.status(200).json({status:true,message:'Banners Submitted Successfully...'})
          }
      })
    }
    catch(e)
    { console.log('error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
    }
  });
  


module.exports = router;