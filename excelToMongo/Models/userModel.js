var mongoose  =  require('mongoose');  
   
var excelSchema = new mongoose.Schema({  
    name:{  
        type:String  
    },  
    email:{  
        type:String  
    },    
    mobile:{  
        type:Number  
    },
    gender:{
        type:String
    },
    department:{
        type:String
    },
    degignation:{
        type:String
    },
    salary:{
        type:Number
    },
    status:{
        type:String
    }
});  
   
module.exports = mongoose.model('userModel',excelSchema);  