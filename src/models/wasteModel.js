const db = require("../firestore");

const wasteModel = {
  async addWaste(data) {
    const wasteRef = await db.collection("waste_history").add(data);
    return wasteRef.id;
  },

  async getWasteHistoryByUser(userId) {
    const snapshot = await db.collection("waste_history").where("userId", "==", userId).get();
    const wasteHistory = [];
    snapshot.forEach((doc) => {
      wasteHistory.push({ id: doc.id, ...doc.data() });
    });
    return wasteHistory;
  },
};

module.exports = wasteModel;
