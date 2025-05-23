const express = require('express');
const {PORT}= require('./config/serverConfig');
const ApiRoutes=require("./routes/index");
const sequelize= require('sequelize')
const db= require('./models/index');
const UserService= require('./services/user-service');
const {User,Role}= require('./models/index');

const setupAndStartServer= async ()=>{
    const app= express();
    
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));// this enables body parsing

    app.use('/api',ApiRoutes);

    app.listen(PORT,async ()=>{
        console.log(`Server is running on ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true});
        }
        // const u1= await User.findByPk(3);
        // const r1=await Role.findByPk(2);
        // u1.addRole(r1);
        // const response= await u1.hasRole(r1);
        // console.log(response);
    });
};

setupAndStartServer();