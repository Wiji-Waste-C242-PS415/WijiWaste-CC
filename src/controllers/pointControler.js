const pointModel = require("../models/pointModel");

const pointController = {
  async exchangePoints(request, h) {
    const { userId, pointsToExchange } = request.payload;

    if (!userId || !pointsToExchange) {
      return h.response({ error: "User ID and points to exchange are required." }).code(400);
    }

    try {
      const user = await pointModel.getUserById(userId);
      if (!user) {
        return h.response({ error: "User not found." }).code(404);
      }

      if (user.points < pointsToExchange) {
        return h.response({ error: "Insufficient points." }).code(400);
      }

      const rupiahAmount = pointsToExchange;

      const newPoints = user.points - pointsToExchange;
      await pointModel.updateUserPoints(userId, newPoints);

      await pointModel.addPointExchangeHistory(userId, {
        exchangedPoints: pointsToExchange,
        rupiahReceived: rupiahAmount,
        date: new Date().toISOString(),
      });

      return h.response({
        message: "Points exchanged successfully!",
        data: {
          pointsExchanged: pointsToExchange,
          rupiahReceived: rupiahAmount,
          remainingPoints: newPoints,
        },
      }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to exchange points." }).code(500);
    }
  },

  async getExchangeHistory(request, h) {
    const { userId } = request.params;

    try {
      const history = await pointModel.getPointExchangeHistory(userId);

      const groupedHistory = history.reduce((acc, item) => {
        const date = new Date(item.date).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
      }, {});

      return h.response({ data: groupedHistory }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to fetch exchange history." }).code(500);
    }
  },
};

module.exports = pointController;
