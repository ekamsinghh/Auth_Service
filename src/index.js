const express = require('express');
const {PORT}= require('./config/serverConfig');

const setupAndStartServer= async ()=>{
    const app= express();
    
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));// this enables body parsing

    app.listen(PORT,async ()=>{
        console.log(`Server is running on ${PORT}`);
    });
};

setupAndStartServer();