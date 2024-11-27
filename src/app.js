const Hapi = require("@hapi/hapi");
// require("dotenv").config();

// Import routes
const authRoutes = require("../src/routes/auth");
const wasteRoutes = require("../src/routes/waste");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  // Register routes
  server.route([...authRoutes, ...wasteRoutes]);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
