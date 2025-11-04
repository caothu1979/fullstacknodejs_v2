import { render } from "ejs";
import express from "express";
import homeController from "../controllers/homeController";
let router = express.Router();

let initWebRouters = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/get-users", homeController.displayAllUsers);
    router.get("/create-users", homeController.createUsers);
    router.post("/post-users", homeController.postCreateUsers);
    router.get("/edit-user", homeController.editUpdateUser);
    router.get("/hoidanit", (req, res) => {
    return res.send("Hello word with hoidanit");
    });
    return app.use("/", router);
}
module.exports = initWebRouters;
