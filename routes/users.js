var express = require('express');
var router = express.Router();

var pool=require('./pool')
var upload=require('./multer')

/* GET home page. */
router.post('/submit_user',upload.single('picture') ,function(req, res, next) {
  try{

    pool.query("insert into userdata (mobileno,emailid,username) values(?,?,?)",[req.body.mobileno,req.body.emailid,req.body.username],function(error,result){
        if(error)
        
        {console.log(error)
          res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
        else
        {
            res.status(200).json({status:true,message:'User Submitted Successfully...'})
        }
    })
  }
  catch(e)
  { console.log('error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
  }
});


router.post('/check_userdata',upload.single('picture') ,function(req, res, next) {
  try{

    pool.query("select * from userdata where mobileno=? ",[req.body.mobileno],function(error,result){
        if(error)
        
        {console.log(error)
          res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
        else

        {
          if(result.length==1)
            res.status(200).json({status:true,data:result[0],message:'User found.....'})
          else
          res.status(200).json({status:false,data:[],message:'User not found.....'})
        }
    })
  }
  catch(e)
  { console.log('error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
  }
});


router.post('/check_user_address',upload.single('picture') ,function(req, res, next) {
  try{
    console.log("userrr",req.body)

    pool.query("select * from address where mobileno=? ",[req.body.mobileno],function(error,result){
        if(error)
        
        {console.log(error)
          res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
        else

        {
          if(result.length>=1)
            res.status(200).json({status:true,data:result,message:'User found.....'})
          else
          res.status(200).json({status:false,data:[],message:'User not found.....'})
        }
    })
  }
  catch(e)
  { console.log('error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
  }
});

router.post('/submit_user_address',function(req, res, next) {
  try{

    pool.query("insert into address (mobileno,address,landmark,state,city,pincode) values(?,?,?,?,?,?)",[req.body.mobileno,req.body.address,req.body.landmark,req.body.state,req.body.city,req.body.pincode],function(error,result){
        if(error)
        
        {console.log(error)
          res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
        else
        {
            res.status(200).json({status:true,message:'Address Submitted Successfully...'})
        }
    })
  }
  catch(e)
  { console.log('error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
  }
});



router.post('/save_order',function(req, res, next) {
  try{

    pool.query("insert into orders (userid,mobileno,emailid,orderdate,paymentstatus,paymentid) values(?,?,?,?,?,?)",[req.body.userid,req.body.mobileno,req.body.emailid,new Date().toString(),req.body.paymentstatus,req.body.paymentid],function(error,result){
        if(error)
        
        {console.log(error)
          res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}
        else
        {
            
            console.log(result)

            pool.query("insert into orderdetails (orderid, productdetailid, price, offerprice, qty) values ?",[req.body.orderlist?.map((item)=>{

            return[result.insertId,item.productdetailid,item.price,item.offerprice,item.qty]})


            ],function(error,result){
              if(error)
        
              {console.log(error)
                res.status(200).json({status:false,message:'Server Error:Pls Contact Database Administrator...'})}

                else
                {
                    res.status(200).json({status:true,message:'Order Submitted Successfully...'})
                    console.log(result)

                }

            } )
        }
    })
  }
  catch(e)
  { console.log('error:',e)
    res.status(200).json({status:false,message:'Server Error:Pls Contact server Administrator......'})
  }
});



router.get('/display_all_orders',function(req,res){

  try{

    pool.query("select * from orders",function(error,result){
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

router.post('/display_all_orderdetails',function(req,res){

  try{

    pool.query("select  OD.*,PD.*,(select P.picture from product P where P.productid=PD.productid) as picture ,(select P.productname from product P where P.productid=PD.productid) as productname from orderdetails OD, productdetails PD where OD.productdetailid=PD.productdetailid and OD.orderid=?",[req.body.orderid],function(error,result){
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
