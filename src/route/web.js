import { render } from "ejs";
import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRouters = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/about", homeController.getAboutPage);
    router.get("/get-users", homeController.displayAllUsers);
    router.get("/create-users", homeController.createUsers);
    router.post("/post-users", homeController.postCreateUsers);
    router.get("/edit-users", homeController.editUpdateUser);
    router.post("/put-users", homeController.updateUser);
    router.get("/delete-users", homeController.deleteUser);
    
    router.post("/api/login", userController.handlelogin);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.delete("/api/delete-user", userController.handleDeleteUserById);
    
    router.get("/hoidanit", (req, res) => {
    return res.send("Hello word with hoidanit");
    });
    return app.use("/", router);
}
module.exports = initWebRouters;
