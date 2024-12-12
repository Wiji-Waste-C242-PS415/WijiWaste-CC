const profileModel = require("../models/profileModel");
const fs = require("fs");
const path = require("path");

const profileController = {
  // Mengambil profil pengguna berdasarkan userId
  async getProfile(request, h) {
    const userId = request.params.userId; // Mendapatkan userId dari parameter URL
    try {
      const user = await profileModel.getUserById(userId);
      if (!user) {
        return h.response({ error: "User not found." }).code(404);
      }

      return h
        .response({
          message: "Profile retrieved successfully.",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            address: user.address || "",
            photoUrl: user.photoUrl || "",
          },
        })
        .code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Failed to retrieve profile." }).code(500);
    }
  },

  // Memperbarui profil pengguna
  async updateProfile(request, h) {
    const { userId } = request.query; // Ambil userId dari query parameter
    const { name, email, address } = request.payload;
    const file = request.payload.photo; // Ambil file dari payload (stream)

    // Validasi data secara manual
    if (!userId) {
      return h.response({ error: "UserId diperlukan." }).code(400);
    }

    if (!name || !email) {
      return h.response({ error: "Nama dan email diperlukan." }).code(400);
    }

    try {
      const user = await profileModel.getUserById(userId);
      if (!user) {
        return h.response({ error: "Pengguna tidak ditemukan." }).code(404);
      }

      const updatedData = { name, email, address };

      // Jika ada file gambar, simpan ke server
      if (file) {
        const uploadDir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir); // Membuat folder upload jika belum ada
        }

        // Gunakan timestamp untuk nama file yang unik
        const filename = `${userId}-${Date.now()}`;
        const filepath = path.join(uploadDir, filename);
        const fileStream = fs.createWriteStream(filepath);

        // Tuliskan file ke server
        file.pipe(fileStream);

        updatedData.photoUrl = `/uploads/${filename}`;  // Simpan path gambar ke database
      }

      await profileModel.updateUser(userId, updatedData);

      return h.response({
        message: "Profil berhasil diperbarui.",
        redirect: `/profile?userId=${userId}`,
      }).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Gagal memperbarui profil." }).code(500);
    }
  }

};

module.exports = profileController;
