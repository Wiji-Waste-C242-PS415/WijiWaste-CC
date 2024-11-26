const db = require("../firestore");

const infoModel = {
  async getAllInfo() {
    const snapshot = await db.collection("info_points").get();
    if (snapshot.empty) return [];
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },
};

module.exports = infoModel;
