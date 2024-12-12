const getDb = require("../firestore");

const wasteModel = {
  async addWaste(data) {
    const db = await getDb();
    const wasteRef = await db.collection("waste_history").add(data);
    return wasteRef.id;
  },

  async getWasteHistoryByUser(userId) {
    const db = await getDb();
    const snapshot = await db.collection("waste_history").where("userId", "==", userId).get();
    const wasteHistory = [];
    snapshot.forEach((doc) => {
      wasteHistory.push({ id: doc.id, ...doc.data() });
    });
    return wasteHistory;
  },
};

module.exports = wasteModel;
