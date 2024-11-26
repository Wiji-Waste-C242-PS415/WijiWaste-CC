const infoController = require("../controllers/infoController");

const infoRoutes = [
  {
    method: "GET",
    path: "/info",
    handler: infoController.getInfo,
  },
];

module.exports = infoRoutes;

function add () {
  
}
