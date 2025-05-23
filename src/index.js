const express = require('express');
const {PORT}= require('./config/serverConfig');
const ApiRoutes=require("./routes/index");
const UserService= require('./services/user-service');
const setupAndStartServer= async ()=>{
    const app= express();
    
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));// this enables body parsing

    app.use('/api',ApiRoutes);

    app.listen(PORT,async ()=>{
        console.log(`Server is running on ${PORT}`);
        // const userService= new UserService();
        // const result=await userService.signIn("xyz@abc.com","waheguru13");
        // console.log(result);
    });
};

setupAndStartServer();