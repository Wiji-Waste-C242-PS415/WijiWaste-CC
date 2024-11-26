const db = require("../firestore");

// Fungsi untuk mendapatkan data user berdasarkan userId
const getUserById = async (userId) => {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error("User not found");
  }

  return { id: userDoc.id, ...userDoc.data() };
};

// Fungsi untuk memperbarui poin user
const updateUserPoints = async (userId, newPoints) => {
  const userRef = db.collection("users").doc(userId);
  await userRef.update({ points: newPoints });
};

module.exports = { getUserById, updateUserPoints };
