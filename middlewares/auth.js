const {authenticate} = require('../controllers/auth.js')

module.exports ={
    jwtVerify: async (req,res,next) => {
    // if (!!req.headers.password) {
    //     return next();
    // }
    if (!!req.headers.Authorization) {
        req.headers.authorization = req.headers.Authorization;
    }
    if (!!req.headers.authorization) {
        try {
            await authenticate(req.headers.authorization).then(response => {
                console.log(response,"AUthENTICATEDDD")
                req.user = response
            });
           
          return  next()
        } catch (invalidToken) {
            console.log("[invalidToken]: ", invalidToken)
            // Services.Respond.unAuthorized(res, "Invalid Auth");
        }
    } else {
        // Services.Respond.unAuthorized(res, "Missing Authorization header");
        console.log("Missing Authorization header")
    }
}
}