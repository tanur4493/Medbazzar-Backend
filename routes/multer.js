var multer=require('multer')
const { uuid}  = require('uuidv4');

var storage=multer.diskStorage({
    destination:(req,file,path)=>
    {path(null,'public/images')}
    ,
    filename:(req,file,path)=>{
        var ext= file.originalname.substring(file.originalname.lastIndexOf("."))
        path(null,uuid()+ext)
    }
});
var upload=multer({storage:storage})
module.exports=upload;