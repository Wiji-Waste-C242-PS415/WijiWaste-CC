const db = require("../firestore");

const profileModel = {
  // Mendapatkan pengguna berdasarkan email
  async getUserByEmail(email) {
    const snapshot = await db.collection("users").where("email", "==", email).get();
    if (snapshot.empty) return null;
    return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
  },

  // Mendapatkan pengguna berdasarkan userId
  async getUserById(userId) {
    const doc = await db.collection("users").doc(userId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  // Memperbarui data pengguna
  async updateUser(userId, data) {
    await db.collection("users").doc(userId).update(data);
  },
};

module.exports = profileModel;
