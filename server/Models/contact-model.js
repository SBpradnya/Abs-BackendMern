const{Schema,model}=require("mongoose");
const { create } = require("./user-model");


const contactSchema =new Schema({
    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      message:{
        type:String,
        required: false,
      }
});


const Contact=new model('Contact', contactSchema);
module.exports=Contact;
