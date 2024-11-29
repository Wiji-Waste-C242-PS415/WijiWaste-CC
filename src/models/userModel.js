const db = require("../firestore");

const userModel = {
  async createUser(data) {
    const { id, ...userData } = data; // Pisahkan ID dan data lainnya
    const userRef = db.collection("users").doc(id); // Gunakan ID sebagai document ID
    await userRef.set(userData); // Simpan data
    return id; // Kembalikan ID
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
