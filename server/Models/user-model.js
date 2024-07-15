const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require ("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// secure the password with the bcrypt
userSchema.pre("save", async function (next) {
  const user = this;
  console.log("actual data ", this);

  if (!user.isModified) {
    return next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_Password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_Password;
  } catch (error) {
    return next(error);
  }
});
// comparePassword
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//json web token
userSchema.methods.generateToken=async function(){
  try{
return jwt.sign({
  userID:this._id.toString(),
  email:this.email,
  isAdmin:this.isAdmin,
},
process.env.JWT_SELECT_KEY,
{
  expiresIn:"30d",
}
);
  }
  catch(error)
  {
  console.error(error);
  }
};

// define the model or the collection name
const USER= mongoose.model("USER", userSchema);

module.exports=USER