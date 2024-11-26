const authController = require("../controllers/authController");

const authRoutes = [
  {
    method: "POST",
    path: "/register",
    handler: authController.register,
  },
  {
    method: "POST",
    path: "/login",
    handler: authController.login,
  },
  {
    method: "POST",
    path: "/reset-password",
    handler: authController.resetPassword,
  },
];

module.exports = authRoutes;
