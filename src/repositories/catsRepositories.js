const Cat = require("../shemas/catsSchema");

class CatsRepository {
  constructor() {
    this.model = Cat;
  }
  async getAll(userId, { limit = 5, offset = 0, sortBy, sortByDesc, filter }) {
    const result = await this.model.paginate(
      { owner: userId },
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split("|").join(" ") : "",
        populate: {
          path: "owner",
          select: "name sex email -_id",
        },
      }
    );
    return result;
  }
  async getById(userId, id) {
    const results = await this.model
      .findOne({ _id: id, owner: userId })
      .populate({
        path: "owner",
        select: "name sex email -_id",
      });
    return results;
  }
  async create(userId, body) {
    const results = await this.model.create({ ...body, owner: userId });
    return results;
  }
  async update(userId, id, body) {
    const results = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    );
    return results;
  }
  async remove(userId, id) {
    const results = await this.model.findByIdAndDelete({
      _id: id,
      owner: userId,
    });
    return results;
  }
}

module.exports = { CatsRepository };
