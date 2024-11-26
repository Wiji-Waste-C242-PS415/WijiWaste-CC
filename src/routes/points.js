const { getUserPoints, exchangePoints } = require("../controllers/pointControler");

const pointsRoutes = [
  {
    method: "GET",
    path: "/points",
    handler: getUserPoints,
  },
  {
    method: "POST",
    path: "/points/exchange",
    handler: exchangePoints,
  },
];

module.exports = pointsRoutes;
