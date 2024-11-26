const wasteModel = require("../models/wasteModel");
const { nanoid } = require('nanoid')
//management
const wasteController = {
  async addWaste(request, h) {
    const { userId, trashType, weight, address, date } = request.payload;

    try {
      const wasteId = await wasteModel.addWaste({
        userId: nanoid(16),
        trashType,
        weight,
        address,
        date,
      });

      return h.response({
        message: "Waste added successfully!",
        wasteId }).code(201);
    } catch (err) {
      console.error(err);
      return h.response({
        error: "Failed to add waste."
    }).code(500);
    }
  },

  async getWasteHistory(request, h) {
    const { userId } = request.params;

    try {
      const wasteHistory = await wasteModel.getWasteHistoryByUser(userId);
      return h.response({
        wasteHistory
    }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({
        error: "Failed to get waste history."
    }).code(500);
    }
  },
};

module.exports = wasteController;
