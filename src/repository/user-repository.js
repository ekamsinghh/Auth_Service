const ValidationError = require('../utils/validation-error');
const {User, Role} = require('../models/index');

class UserRepository{

    async createUser(data){
        try{
            const user= await User.create(data);
            return user;
        }
        catch(error){
            if(error.name=="SequelizeValidationError"){
                throw new ValidationError(error);
            }            
            console.log("Something went wrong in Repository layer");
            throw {error};
        }
    }

    async destroy(userId){
        try{
            await User.destroy({
                where: {
                    id:userId
                }
            });
            return true;
        }
        catch(error){
            console.log("Something went wrong in repository layer");
            throw {error};
        }
    }

    async getById(userId){
        try{
            const user = await User.findByPk(userId,
                {
                    attributes: ['id','email'],//* you could also have done --> attributes:{ exclude : ['password'] }
                    where : {
                        id:userId
                    }
                }
            );
            return user;
        }
        catch(error){
            console.log("Some error occured in repository layer");
            throw {error};
        }
    }

    async getByEmail(email){
        try{
            const user=await User.findOne({
                where: {
                    email:email
                }
            });
            return user;
        }
        catch(error){
            console.log("Some error occured in repository layer");
            throw {error};
        }
    }

    async isAdmin(userId){
        try{
            const user=await User.findByPk(userId);
            const adminRole=await Role.findOne({
                where :{
                    name: 'ADMIN'
                }
            });
            if(!user){
                console.log(`No user with id: ${userId} exists`);
                throw {error: "No such user Exists"};
            }
            const response = user.hasRole(adminRole);
            return response;
        }
        catch(error){
            console.log("Some error occured in repository layer");
            throw {error};
        }
    }
}

module.exports= UserRepository;