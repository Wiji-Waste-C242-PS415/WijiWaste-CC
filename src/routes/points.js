const pointController = require("../controllers/pointControler");

const pointRoutes = [
  {
    method: "POST",
    path: "/points/exchange",
    handler: pointController.exchangePoints,
  },
  {
    method: "GET",
    path: "/points/history/{userId}",
    handler: pointController.getExchangeHistory,
  },
];

module.exports = pointRoutes;
