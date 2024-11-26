const profileController = require("../controllers/profileController");

const profileRoutes = [
  {
    method: "GET",
    path: "/profile",
    handler: profileController.getProfile,
  },
  {
    method: "PUT",
    path: "/profile",
    handler: profileController.updateProfile,
  },
];

module.exports = profileRoutes;
