const routes = require("express").Router();

routes.use("/api/admin", require("../controller/AdminController"));
routes.use("/api/user", require("../controller/UserController"));
routes.use("/api/email", require("../controller/EmailController"));
module.exports = routes;