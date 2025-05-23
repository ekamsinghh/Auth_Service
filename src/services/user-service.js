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

    async isAuthenticated(token){
        try{
            const response= this.verifyToken(token); //* response--> {email: '' , id: '' , iat: '' , exp: '' }
            if(!response){
                throw {error:"Invalid Token"};
            }
            const user= await this.repository.getById(response.id);
            if(!user){
                throw {error:"User Not Found"}
            }
            return user.id;
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
    
    async signIn(email,plainPassword){
        try{
            const user=await this.repository.getByEmail(email);
            const encryptedPassword=user.password;
            const response= this.checkPassword(plainPassword,encryptedPassword);
            if(!response){
                console.log("Password Not Matched");
                throw {error:"Wrong Password"};
            }
            //* If password Matches--> Create a token and send it to the user
            const newJwt = this.createToken({
                id:user.id,
                email:user.email
            });
            return newJwt;
        }
        catch(error){
            console.log("Something Went wrong in SignIn process");
            throw {error};
        }
    }

    checkPassword(userInputPlainPassword,encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        }
        catch(error){
            console.log("Something Went wrong in Password checking");
            throw {error};
        }
    }

    async isAdmin(userId){
        try{
            const response=await this.repository.isAdmin(userId);
            return response;
        }
        catch(error){
            console.log("Something Went wrong");
            throw {error};
        }
    }
}

module.exports= UserService;