const { AuthService, UserService } = require("../services");
const { HttpCode } = require("../helpers/constants");
const authService = new AuthService();
const userService = new UserService();

const register = async (req, res, next) => {
  const { name, email, password, sex } = req.body;
  const user = await userService.findByEmail(email);

  if (user) {
    return next({
      statuse: HttpCode.CONFLICT,
      data: "Conflict",
      message: "This email already use.",
    });
  }
  try {
    const newUser = await userService.create({ name, email, password, sex });

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        name: newUser.name,
        id: newUser.id,
        email: newUser.email,
        sex: newUser.sex,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body);
    if (token) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        token,
      });
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: "Invalid credentials",
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const id = req.user.id;
  await authService.logout(id);
  return res
    .status(HttpCode.NO_CONTENT)
    .json({ status: "success", code: HttpCode.NO_CONTENT });
};

module.exports = {
  register,
  login,
  logout,
};
