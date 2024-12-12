const getDb = require("../firestore");

const userModel = {
  async createUser(user) {
    const db = await getDb();
    const usersCollection = db.collection("users");
    await usersCollection.doc(user.id).set(user);
  },

  async getUserByEmail(email) {
    const db = await getDb();
    const usersCollection = db.collection("users");
    const snapshot = await usersCollection.where("email", "==", email).get();
    if (snapshot.empty) {
      return null;
    }
    const user = snapshot.docs[0].data();
    user.id = snapshot.docs[0].id; // Tambahkan ID dokumen
    return user;
  },

  async updateUserPassword(email, newPassword) {
    const db = await getDb();
    const usersCollection = db.collection("users");
    const snapshot = await usersCollection.where("email", "==", email).get();
    if (snapshot.empty) {
      throw new Error("User not found");
    }
    const doc = snapshot.docs[0];
    await usersCollection.doc(doc.id).update({ password: newPassword });
  },
};

module.exports = userModel;
