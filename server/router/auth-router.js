const express=require ("express");
const router = express.Router();
const authcontrollers=require("../Controller/auth-controller")
const validate = require("../middlewares/validate-middleware");
const signupSchema = require("../validator/auth-validator");
const signinSchema = require("../validator/login-validator");

router.route("/").get(authcontrollers.home);
 
router.route("/register").post(validate(signupSchema),authcontrollers.register);

router.route("/login").post(validate(signinSchema),authcontrollers.login);

 router.post("/register", authcontrollers.register);
 router.post("/login", authcontrollers.login);
 //router.post("/filght",authcontrollers.flight);


module.exports=router;