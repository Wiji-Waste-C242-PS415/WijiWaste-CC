const profileController = require("../controllers/profileController");

const profileRoutes = [
  {
    method: "GET",
    path: "/profile/{userId}",
    handler: profileController.getProfile,
  },
  {
    method: "PUT",
    path: "/profile",
    handler: profileController.updateProfile,
    options: {
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data", // Mendukung upload file
      },
    },
  },
];

module.exports = profileRoutes;
