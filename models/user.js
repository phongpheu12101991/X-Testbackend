const crypto = require("crypto");

class User {
  username;

  constructor(username) {
    this.username = username;
  }

  generatePassword(newPassword) {
    this.salt = crypto.randomBytes(128).toString("base64");
    this.hash = crypto
      .pbkdf2Sync(newPassword, this.salt, 10000, 512, "sha512")
      .toString("hex");
    return newPassword;
  }
}

module.exports = User;
