const dotenv=require('dotenv');
const bcryprt=require('bcrypt');
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    SALT: bcryprt.genSaltSync(10),
    JWT_KEY:process.env.JWT_KEY
}