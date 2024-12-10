const db = require("../firestore");

const profileModel = {
  async createUser(data) {
    const userRef = await db.collection("users").add(data);
    return userRef.id;
  },

  async getUserByEmail(email) {
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  },

  async getUserById(userId) {
    const doc = await db.collection("users").doc(userId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async updateUser(id, data) {
    await db.collection("users").doc(id).update(data);
  },
};

module.exports = profileModel;
