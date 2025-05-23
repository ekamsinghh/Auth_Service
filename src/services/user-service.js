const UserRepository= require('../repository/user-repository');
const jwt= require('jsonwebtoken');
const {JWT_KEY}= require('../config/serverConfig');
const bcrypt= require('bcrypt');

class UserService{
    constructor(){
        this.repository=new UserRepository();
    }

    async create(data){
        try{
            const user= await this.repository.createUser(data);
            return user;
        }
        catch(error){
            console.log("Some error occured in service layer");
            throw {error};
        }
    }

    async destroy(userId){
        try{
            await this.repository.destroy(userId);
            return true;
        }
        catch(error){
            console.log("Some error occured in service layer");
            throw {error};
        }
    }

    createToken(user) {
        try{
            const response= jwt.sign(user,JWT_KEY,{
                expiresIn:'1h'
            })
            return response;
        }
        catch(error){
            console.log("Something went wrong in token creation");
        }
    }

    verifyToken(token){
        try{
            const response= jwt.verify(token,JWT_KEY);
            return response;
        }
        catch(error){
            console.log("Something went wrong in token verification",error);
            throw {error};
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try{
            return bcrypt.compare(userInputPlainPassword,encryptedPassword);
        }
        catch(error){
            console.log("Something Went wrong in Password checking");
            throw {error};
        }
    }
}

module.exports= UserService;