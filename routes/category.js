var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')
var verifyToken=require('./authMiddleware')

/* GET home page. */
router.post('/submit_category',upload.single('picture') ,function(req, res, next) {
  try{

    pool.query("insert into category (categoryname,picture) values(?,?)",[req.body.categoryname,req.file.filename],function(error,result){
        if(error)
        
        {console.log(error)
          res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
        else
        {
            res.status(200).json({status:true,message:'Category Submitted Successfully...'})
        }
    })
  }
  catch(e)
  { console.log('error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
  }
});



router.get('/display_all_category',verifyToken,function(req,res){

  try{

    pool.query("select * from category",function(error,result){
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




router.post('/edit_category_data', function(req, res, next) {
  try{
    
    pool.query("update category  set categoryname=? where categoryid=?",[req.body.categoryname,req.body.categoryid],function(error,result){
     if(error)
     {  console.log(error)
         res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
     else
     {
      console.log(result)
        res.status(200).json({status:true,message:'Category Updated Successfully...'})

     }
    
    })



  }
  catch(e)
  {
    console.log('Error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
  }

});









router.post('/edit_category_picture',upload.single('picture'),function(req, res, next) {
  try{

    pool.query("update category set picture=? where categoryid=? ",[req.file.filename,req.body.categoryid],function(error,result){
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



router.post('/delete_category_data',function(req, res, next) {
  try{

    pool.query("delete from category where categoryid=? ",[req.body.categoryid],function(error,result){
        if(error)
        
        {console.log(error)
          res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
        else
        {
            res.status(200).json({status:true,message:'Category Deleted Successfully...'})
        }
    })
  }
  catch(e)
  { console.log('error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
  }
});









module.exports = router;
