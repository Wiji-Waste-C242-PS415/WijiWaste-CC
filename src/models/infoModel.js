const getDb = require("../firestore");

const infoModel = {
  async getAllInfo() {
    const db = await getDb();
    const snapshot = await db.collection("info_points").get();
    if (snapshot.empty) return [];
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },
};

module.exports = infoModel;
