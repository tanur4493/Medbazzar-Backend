 var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

/* GET home page. */
router.post('/submit_subcategory',upload.single('picture') ,function(req, res, next) {
  try{

    pool.query("insert into subcategory (categoryid,subcategoryname,picture) values(?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.file.filename],function(error,result){
        if(error)
        
        {console.log(error)
          res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
        else
        {
            res.status(200).json({status:true,message:'subCategory Submitted Successfully...'})
        }
    })
  }
  catch(e)
  { console.log('error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
  }
});


router.get('/display_all_subcategory',function(req,res){

    try{
  
      pool.query("select S.*,(select C.categoryname from category C where C.categoryid = S.categoryid) as categoryname from subcategory S",function(error,result){
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
  
  });


  router.post('/edit_subcategory_data', function(req, res, next) {
    try{
      
      pool.query("update subcategory  set categoryid=?,subcategoryname=? where subcategoryid=?",[req.body.categoryid,req.body.subcategoryname,req.body.subcategoryid],function(error,result){
       if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {
        console.log(result)
          res.status(200).json({status:true,message:' Sub Category Updated Successfully...'})
  
       }
      
      })
  
  
  
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });



  router.post('/edit_subcategory_picture',upload.single('picture'),function(req, res, next) {
    try{
  
      pool.query("update subcategory set picture=? where subcategoryid=? ",[req.file.filename,req.body.subcategoryid],function(error,result){
          if(error)
          
          {console.log(error)
            res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
          else
          {
              res.status(200).json({status:true,message:'Picture updated Successfully...'})
          }
      })
    }
    catch(e)
    { console.log('error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
    }
  });



  router.post('/delete_subcategory_data',function(req, res, next) {
    try{
  
      pool.query("delete from subcategory where subcategoryid=? ",[req.body.subcategoryid],function(error,result){
          if(error)
          
          {console.log(error)
            res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
          else
          {
              res.status(200).json({status:true,message:'Sub Category Deleted Successfully...'})
          }
      })
    }
    catch(e)
    { console.log('error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
    }
  });
  
  
  router.post('/fetch_all_subcategory_by_id',function(req, res, next) {
    try{
      console.log(req.body)
  
      pool.query("select * from subcategory where categoryid=?",[req.body.categoryid],function(error,result){
          if(error)
          
          {console.log("errrrrr",error)
            res.status(400).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
          else
          {
            console.log("Suuuu", result)
              res.status(200).json({status:true,message:'fetched subcategory Successfully...',data:result})
          }
      })
    }
    catch(e)
    { console.log('error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
    }
  });

  
  
  
  







module.exports = router;
