const User = require("../Models/userModel");

const createUserRepository = async ({firstName, lastName, email, password, age})=>{
    const newUser = await User.create({
      firstName, lastName, email, password, age
      })
      return newUser
};
module.exports = {createUserRepository}