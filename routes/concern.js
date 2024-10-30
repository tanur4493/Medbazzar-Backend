var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/submit_concern',upload.single('picture') ,function(req, res, next) {
    try{
  
      pool.query("insert into concern (concernname,picture) values(?,?)",[req.body.concernname,req.file.filename],function(error,result){
          if(error)
          
          {console.log(error)
            res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
          else
          {
              res.status(200).json({status:true,message:'Concern Submitted Successfully...'})
          }
      })
    }
    catch(e)
    { console.log('error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
    }
  });


  router.get('/display_all_concern',function(req,res){

    try{
  
      pool.query("select * from concern",function(error,result){
          if(error)
          
          {console.log(error)
            res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
          else
          {
              res.status(200).json({status:true,message:'success', data:result})
          }
      })
    }
    catch(e)
    { console.log('error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
    }
  
  })
  
  
  

module.exports = router;