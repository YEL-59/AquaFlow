import { app } from "./app.js";
import { env } from "./config/env.js";

const server = app.listen(env.PORT, () => {
  console.log(`🌊 AquaFlow Core API Server running on port ${env.PORT} [${env.NODE_ENV}]`);
  console.log(`🔗 Health Check: http://localhost:${env.PORT}/health`);
  console.log(`🛡️ Auth Endpoint: http://localhost:${env.PORT}/api/v1/auth`);
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing AquaFlow server gracefully...");
  server.close(() => {
    console.log("AquaFlow server terminated.");
    process.exit(0);
  });
});
