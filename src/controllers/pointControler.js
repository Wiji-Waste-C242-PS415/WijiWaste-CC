const { getUserById, updateUserPoints } = require("../models/pointModel");

// Handler untuk mendapatkan poin user
const getUserPoints = async (request, h) => {
  const { userId } = request.query; // Mengambil userId dari query

  try {
    const user = await getUserById(userId);
    return h.response({
      success: true,
      points: user.points || 0, // Default ke 0 jika poin tidak ada
    });
  } catch (error) {
    return h.response({
      success: false,
      message: error.message,
    }).code(404);
  }
};

// Handler untuk menukar poin menjadi rupiah
const exchangePoints = async (request, h) => {
  const { userId, pointsToExchange } = request.payload; // Mengambil userId dan jumlah poin dari body
  const exchangeRate = 1; // 1 poin = 1 rupiah

  try {
    const user = await getUserById(userId);

    if (user.points < pointsToExchange) {
      return h.response({
        success: false,
        message: "Not enough points",
      }).code(400);
    }

    // Hitung poin baru dan simpan ke Firestore
    const newPoints = user.points - pointsToExchange;
    await updateUserPoints(userId, newPoints);

    return h.response({
      success: true,
      message: "Points exchanged successfully",
      exchangedAmount: pointsToExchange * exchangeRate, // Konversi ke rupiah
      remainingPoints: newPoints,
    });
  } catch (error) {
    return h.response({
      success: false,
      message: error.message,
    }).code(400);
  }
};

module.exports = { getUserPoints, exchangePoints };
