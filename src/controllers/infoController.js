const infoModel = require("../models/infoModel");

const infoController = {
  async getInfo(request, h) {
    try {
      const infoList = await infoModel.getAllInfo();
      return h.response({ message: "Info retrieved successfully.", data: infoList }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to retrieve info." }).code(500);
    }
  },
};

module.exports = infoController;
