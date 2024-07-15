const validate = (schema) => async (req, res, next) => {
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      next();
    } catch (err) {
     // console.log(err);
      const status=422;
      const message="Fill the input properly";
      const extraDetails=err.errors[0].message;

      const error={
        status,
        message,
        extraDetails
      };
      console.log(error);
       // res.status(400).json({msg:message});
        next(error);
     // const status = 422;
     // const message = "Fill the input properly";
   //   const extraDetails = err.issues.map((curElem) => curElem.message);
  
    //   const error = {
    //     status,
    //     message,
    //     extraDetails,
    //   };
  
    //   next(extraDetails);
     }
  };
  
  module.exports = validate;