const dotenv=require('dotenv');
const bcryprt=require('bcrypt');
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    SALT: bcryprt.genSaltSync(10),
}