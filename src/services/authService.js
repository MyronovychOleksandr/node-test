const { UsersRepository } = require("../repositories/usersRepositories");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SEKRET_KEY = process.env.JWT_SEKRET_KEY;

class AuthService {
  constructor() {
    this.repository = {
      users: new UsersRepository(),
    };
  }

  async login({ email, password }) {
    const user = await this.repository.users.findByEmail(email);
    if (!user || !user.validPassword(password)) {
      return null;
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: "1h" });
    await this.repository.users.updateToken(id, token);
    return token;
  }

  async logout(id) {
    const data = await this.repository.users.updateToken(id, null);
    return data;
  }
}

module.exports = { AuthService };
