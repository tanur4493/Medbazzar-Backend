var express=require('/express')
var router=express.router()
var pool=require('./pool')
var upload=require('/multer')

router.post('/submit_category',upload.single('picture'),function(req,res,next){
    try{
        pool.query('insert into category(categoryname,picture) values(?,?)',[req.body.categoryname,req.file.filename],function(error,result){

            if(error){
               res.status(200).json({status:false,message:'Server Error:Please Contact to server administrator'})
            }

            else
            {
                res.status(200).json({status:true,message:'category Submitted successfuly'})
            }

        })
}

catch(e)
{
    res.status(200).json({status:false,message:"server error:please contact Server Administrator"})
}


});

router.get('/display_all_category',function(req,res,next){
    try{
        pool.query('select * from category',function(error,result){

            if(error)
            {
                res.status(200).json({status:false,message:"database error:connect to database administrator"})
            }

            else{
                res.status(200).json({status:true,message:"Category displayed successfully"})
            }



        })



    }

    catch(e){
        res.status(200).json({status:false,message:"server error:connect to server administrator"})
    }




});

router.post('/edit_category',upload.single('picture'),function(req,res,next){
    try{
        pool.query('update category set categoryname=? where categoryid=?',[req.body.categoryname,req.body.categoryid],function(error,result){
if(error)
{
    res.status(200).json({status:false,message:'database error:connect to database admininstrator'})
}

else{
    res.status(200).jsom({status:true,message:"edit successfully"})
}

        })

     }

     catch(e){{
        res.status(200).json({status:false,message:"server error:connect to server administrator"})
     }}




});


router.post('delete_category',function(req,res,next){
    try{

        pool.query('delete from category where categoryid=?',[req.body.categoryid],function(error,result){
            if(error){
                res.status(200).json({status:false,message:"error"})
            }

            else
            {
                res.status(200).json({status:true,message:"submitted"})
            }

        })

    }

    catch(e){
        res.status(200).json({status:false,message:'error'})

    }
})




