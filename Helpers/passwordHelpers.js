const bcrypt = require("bcryptjs");

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}
module.exports = { hashPassword };


