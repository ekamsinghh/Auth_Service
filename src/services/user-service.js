const UserRepository= require('../repository/user-repository');

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
}

module.exports= UserService;