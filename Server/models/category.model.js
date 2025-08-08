const mongoose=require('mongoose');







const cateSchema=new mongoose.Schema({
    title:{
        type:String,    
        required:true,
    },
     blogs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Blog"
        }
     ]
  
},{
    timestamps:true // Automatically manage createdAt and updatedAt fields
});
module.exports=mongoose.model('Cate',cateSchema);