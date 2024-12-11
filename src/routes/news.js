const axios = require('axios');

const newsRoutes = [
  {
    method: 'GET',
    path: '/news',
    handler: async (request, h) => {
      const apiKey = '5de5687b0d5c4b76be65a1cd7ab21454'; // Ganti dengan API key Anda
      const query = 'sampah'; // Untuk berita dari Indonesia
      const url = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${apiKey}`;

      try {
        const response = await axios.get(url);
        const newsData = response.data.articles;

        return h.response({
          message: 'News retrieved successfully',
          data: newsData,
        }).code(200);
      } catch (error) {
        console.error(error);
        return h.response({
          message: 'Failed to fetch news',
          error: error.message,
        }).code(500);
      }
    },
  },
];

module.exports = newsRoutes;
