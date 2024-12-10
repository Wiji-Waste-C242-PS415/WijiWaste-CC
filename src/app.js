const Hapi = require("@hapi/hapi");
// Import routes
const authRoutes = require("../src/routes/auth");
const wasteRoutes = require("../src/routes/waste");
const profileRoutes = require("../src/routes/profile")
require("dotenv").config();



const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Register routes
  server.route(
    authRoutes,
    wasteRoutes,
    profileRoutes
  );

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
