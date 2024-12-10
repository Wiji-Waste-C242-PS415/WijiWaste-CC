const profileController = require("../controllers/profileController");
const authMiddleware = require("../middlewares/authMiddleware");

const profileRoutes = [
  {
    method: "GET",
    path: "/profile",
    handler: profileController.getProfile,
    options: {
      pre: [authMiddleware.verifyToken], // Middleware autentikasi
    },
  },
  {
    method: "PUT",
    path: "/profile",
    handler: profileController.updateProfile,
    options: {
      pre: [authMiddleware.verifyToken], // Middleware autentikasi
    },
  },
  {
    method: "POST",
    path: "/logout",
    handler: (request, h) => {
      return h.response({
        message: "Logged out successfully.",
        redirect: "/login",
      }).code(200);
    },
  },
];

module.exports = profileRoutes;
