const validateUserAuth= (req,res,next)=>{
    if( !req.body.email || 
        !req.body.password
    ){
        return res.status(400).json({
            message: "Enter Both the details",
            success: false,
            data: {},
            err: 'Email or password Missing'
        })
    }
    next();
}

const validateIsAdminRequest= (req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            message: "User ID is not mentioned",
            success: false,
            data: {},
            err: 'User Id Missing'
        })
    }
    next();
}

module.exports= {
    validateUserAuth,
    validateIsAdminRequest
};