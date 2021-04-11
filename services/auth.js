const UserRepo = require("../repositories/user");
const User = require("../models/user");
const crypto = require("crypto");

const register = async (username, password) => {
  const existedUser = await UserRepo.findByUsername(username);

  if (existedUser) {
    throw new Error("User is existed");
  }
  const user = new User(username);
  user.generatePassword(password);
  const savedUser = await UserRepo.save(user);
  return savedUser;
};

checkPassword = async (Password, passsalt) => {
  let passhash = await crypto
    .pbkdf2Sync(Password, passsalt, 10000, 512, "sha512")
    .toString("hex");
  return passhash;
};

const login = async (username, password) => {
  const FindUser = await UserRepo.findByUsername(username);

  if (FindUser) {
    let checkhash = await checkPassword(password, FindUser.salt);
    if (FindUser.hash === checkhash) {
      console.log("Check true");
      return true;
    }
    return false;
  }
};

module.exports = { register, login };
