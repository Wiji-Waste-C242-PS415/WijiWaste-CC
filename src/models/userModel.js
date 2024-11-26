const db = require("../firestore");

const userModel = {
  async createUser(data) {
    const userRef = await db.collection("users").add(data);
    return userRef.id;
  },

  async getUserByEmail(email) {
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  },

  async updateUser(id, data) {
    await db.collection("users").doc(id).update(data);
  },
};

module.exports = userModel;
