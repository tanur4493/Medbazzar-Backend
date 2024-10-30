var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/submit_product',upload.single('picture') ,function(req, res, next) {
    try{
  
      pool.query("insert into product (categoryid,subcategoryid,brandid,productname,description,picture) values(?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.file.filename],function(error,result){
          if(error)
          
          {console.log(error)
            res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
          else
          {
              res.status(200).json({status:true,message:'Product Submitted Successfully...'})
          }
      })
    }
    catch(e)
    { console.log('error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
    }
  });

 
  router.get('/display_all_product',function(req,res,next){
    try
    {
        pool.query("select P.*,(select C.categoryname from category C where C.categoryid = P.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid = P.subcategoryid)as subcategoryname,(select B.brandname from brand B where B.brandid = P.brandid) as brandname from product P",function(error,result){
            if (error)
            {
                res.status(200).json({status:false,message:'Server Error Pls Contact Database Administrator....'})
            }
            else
            {
                res.status(200).json({status:true,message:'Success',data:result})
            }
        })
    }
    catch(e)
    {
        res.status(200).json({status:false,message:'Server Error : Pls Contact Server Administrator..... '})
    }

});

  router.post('/edit_product_data', function(req, res, next) {
    try{
      
     // pool.query("update product set categoryid=? ,subcategoryid=?, brandid=?, productname=?, description=? where productid=? ",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.body.productid],function(error,result){
      pool.query("update product set categoryid=? ,subcategoryid=?, brandid=?, productname=?, description=? where productid=? ",[req.body.categoryid,req.body.subcategoryid,req.body.brandid,req.body.productname,req.body.description,req.body.productid],function(error,result){ 
     if(error)
       {  console.log(error)
           res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
       else
       {
        console.log(result)
          res.status(200).json({status:true,message:' Product Updated Successfully...'})
  
       }
      
      })
  
  
  
    }
    catch(e)
    {
      console.log('Error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact Server Administrator...'})
    }
  
  });


  router.post('/edit_product_picture',upload.single('picture'),function(req, res, next) {
    try{
  
      pool.query("update product set picture=? where productid=? ",[req.file.filename,req.body.productid],function(error,result){
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


  

  router.post('/delete_product_data',function(req, res, next) {
    try{
  
      pool.query("delete from product where productid=? ",[req.body.productid],function(error,result){
          if(error)
          
          {console.log(error)
            res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
          else
          {
              res.status(200).json({status:true,message:'Product Deleted Successfully...'})
          }
      })
    }
    catch(e)
    { console.log('error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
    }
  });


  router.post('/fetch_all_product_by_brandid',function(req, res, next) {
    try{
      console.log(req.body)
  
      pool.query("select * from product where brandid=?",[req.body.brandid],function(error,result){
          if(error)
          
          {console.log("errrrrr",error)
            res.status(400).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
          else
          {
            console.log("uuuu", result)
              res.status(200).json({status:true,message:'fetched Product Successfully...',data:result})
          }
      })
    }
    catch(e)
    { console.log('error:',e)
      res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
    }
  });

  
  
  
  
    module.exports = router;