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

module.exports= validateUserAuth;