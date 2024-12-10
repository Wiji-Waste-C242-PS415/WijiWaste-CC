const wasteController = require("../controllers/wasteManagement");

const wasteRoutes = [
  {
    method: "POST",
    path: "/waste",
    handler: wasteController.addWaste,
  },
  {
    method: "GET",
    path: "/waste/{userId}",
    handler: wasteController.getWasteHistory,
  },
];

module.exports = wasteRoutes;
