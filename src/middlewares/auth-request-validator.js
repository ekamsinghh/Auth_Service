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
            message: "BEHEN KE LODE...Id tera baap dega?",
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