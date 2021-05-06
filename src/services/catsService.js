const { CatsRepository } = require("../repositories");

class CatsService {
  constructor() {
    this.repository = {
      cats: new CatsRepository(),
    };
  }

  async getAll(userId, query) {
    const data = await this.repository.cats.getAll(userId, query);
    const { docs: cats, totalDocs: total, limit, offset } = data;
    return { cats, total, limit, offset };
  }
  async getById(userId, { id }) {
    const data = await this.repository.cats.getById(userId, id);
    return data;
  }
  async create(userId, body) {
    const data = await this.repository.cats.create(userId, body);
    return data;
  }
  async update(userId, { id }, body) {
    const data = await this.repository.cats.update(userId, id, body);
    return data;
  }
  async remove(userId, { id }) {
    const data = await this.repository.cats.remove(userId, id);
    return data;
  }
}

module.exports = { CatsService };
