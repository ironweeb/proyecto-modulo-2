module.exports = (app) => {
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  const animessRouter = require("./animes.routes");
  app.use("/animes", animessRouter);
};