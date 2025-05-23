const UserService= require('../services/user-service');

const userService= new UserService();

const create= async (req,res)=>{
    try{
        const user= await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data:user,
            success: true,
            message: "User Created Successfully",
            err: {}
        });
    }
    catch(error){
        console.log("Some error occured in controller layer");
        return res.status(error.statusCode).json({
            data:{},
            success: false,
            message: error.message,
            err: error.explanation
        });
    }
};

const destroy= async (req,res)=>{
    try{
        await userService.destroy(req.params.id);
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            err: {}
        });
    }
    catch(error){
        console.log("Some error happened in Controller layer");
        return res.status(500).json({
            data:{},
            success: false,
            message: "Something Went Wrong",
            err: error
        }) 
    }
}

const signIn= async (req,res)=>{
    try{
        const response= await userService.signIn(req.body.email,req.body.password);
        return res.status(200).json({
            success:true,
            data: response,
            message: "Login Successfull",
            err: {}
        });
    }
    catch(error){
        console.log("Some error happened in Controller layer");
        return res.status(500).json({
            data:{},
            success: false,
            message: "Something Went Wrong",
            err: error
        });
    }
}

const isAuthenticated = async (req,res)=>{
    try{
        const token=req.headers['x-access-token'];
        const response=await userService.isAuthenticated(token);
        return res.status(200).json({
            success:true,
            data: response?`Verifiation Successfull with id: ${response}`:"Verification Failed",
            message: "Login Successfull",
            err: {}
        });
    }
    catch(error){
        console.log("Some error happened in Controller layer");
        return res.status(500).json({
            data:{},
            success: false,
            message: "Something Went Wrong",
            err: error
        });
    }
}

const isAdmin=  async (req,res)=>{
    try{
        const response=await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: response?"User is an Admin":"User is not an Admin",
            err: {}
        })
    }
    catch(error){
        console.log("Some error happened in Controller layer");
        return res.status(500).json({
            data:{},
            success: false,
            message: "Something Went Wrong",
            err: error
        });
    }
}

module.exports={
    create,
    destroy,
    signIn,
    isAuthenticated,
    isAdmin
}