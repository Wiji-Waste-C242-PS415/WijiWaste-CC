const getDb = require("../firestore");

const pointModel = {
  async getUserById(userId) {
    const db = await getDb();
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) return null;
    return { id: userId, ...userDoc.data() };
  },

  async updateUserPoints(userId, newPoints) {
    const db = await getDb();
    const userRef = db.collection("users").doc(userId);
    await userRef.update({ points: newPoints });
  },

  async addPointExchangeHistory(userId, exchangeData) {
    const db = await getDb();
    const historyRef = db.collection("users").doc(userId).collection("pointExchangeHistory");
    await historyRef.add({
      ...exchangeData,
      activityType: exchangeData.activityType || "Menukar poin",
    });
  },

  async getPointExchangeHistory(userId) {
    const db = await getDb();
    const historyRef = db.collection("users").doc(userId).collection("pointExchangeHistory");
    const snapshot = await historyRef.orderBy("date", "desc").get();
    if (snapshot.empty) return [];
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },
};

module.exports = pointModel;
