const { CatsService } = require("../services");
const { HttpCode } = require("../helpers/constants");

const catsServices = new CatsService();

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cats = await catsServices.getAll(userId, req.query);
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      ...cats,
    });
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await catsServices.getById(userId, req.params);
    if (cat) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found cat",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};
const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await catsServices.create(userId, req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        cat,
      },
    });
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await catsServices.update(userId, req.params, req.body);
    if (cat) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found cat",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};
const updateStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await catsServices.update(userId, req.params, req.body);
    if (cat) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found cat",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};
const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cat = await catsServices.remove(userId, req.params);
    if (cat) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          cat,
        },
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found cat",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateStatus,
  remove,
};
