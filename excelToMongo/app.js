var express     = require('express');  
var mongoose    = require('mongoose');  
var multer      = require('multer');  
var path        = require('path');  
var userModel    = require('./models/userModel');  
var excelToJson = require('convert-excel-to-json');
var bodyParser  = require('body-parser');  
var storage = multer.diskStorage({  
destination:(req,file,cb)=>{  
cb(null,'./public/uploads');  
},  
filename:(req,file,cb)=>{  
cb(null,file.originalname);  
}  
});  
var uploads = multer({storage:storage});  
mongoose.connect('mongodb://localhost:27017/exceldemo',{useNewUrlParser:true})  
.then(()=>console.log('connected to db'))  
.catch((err)=>console.log(err))  
var app = express();  
app.set('view engine','ejs');  
app.use(bodyParser.urlencoded({extended:false}));  
app.use(express.static(path.resolve(__dirname,'public')));  
app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});
app.post('/uploadfile', uploads.single("uploadfile"), (req, res) =>{
importExcelData2MongoDB(__dirname + '/uploads/' + req.file.filename);
console.log(res);
});
function importExcelData2MongoDB(filePath){
const excelData = excelToJson({
sourceFile: filePath,
sheets:[{
name: 'Customers',
header:{
rows: 1
},
columnToKey: {
A: '_id',
B: 'name',
C: 'email',
D: 'mobile',
E: 'gender',
F: 'department',
G: 'designation',
H: 'salary',
I: 'status'
}
}]
});
console.log(excelData);

userModel.insertMany(jsonObj,(err,data)=>{  
if(err){  
console.log(err);  
}else{  
res.redirect('/');  
}  
}); 
fs.unlinkSync(filePath);
}
var port = process.env.PORT || 3000;  
app.listen(port,()=>console.log('server run at port '+port));
module.exports = app;