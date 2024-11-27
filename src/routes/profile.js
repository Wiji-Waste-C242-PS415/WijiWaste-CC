const profileController = require("../controllers/profileController");

const profileRoutes = [
  {
    method: "GET",
    path: "/profile",
    handler: profileController.getProfile,
  },
  {
    method: "PUT",
    path: "/profile/edit",
    handler: profileController.updateProfile,
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
