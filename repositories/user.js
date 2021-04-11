const db = require("./index");

const findByUsername = (username) => {
  return db.user.findOne({
    username: username,
  });
};

const save = async (user) => {
  const dbResult = await db.user.findOneAndUpdate(
    { username: user.username },
    {
      $set: {
        name: "",
        salt: user.salt,
        hash: user.hash,
        username: user.username,
        type: "user",
      },
    },
    {
      upsert: true,
      returnOriginal: false,
    }
  );
  return dbResult.value;
};

module.exports = { findByUsername, save };
