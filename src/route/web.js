import { render } from "ejs";
import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
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
    router.post("/api/create-users", userController.createNewUser);
    router.get("/api/get-all-users", userController.handleGetAllUsers);
    router.put("/api/edit-users", userController.handleEditUpdateUser);
    router.delete("/api/delete-users", userController.handleDeleteUser);
    router.get("/api/allcode", userController.getAllCode);
    router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
    router.get("/api/get-all-doctors", doctorController.getAllDoctors);
    router.post("/api/post-infor-doctor", doctorController.postInforDoctor);
    router.get("/api/get-detail-doctor-by-id", doctorController.getDetailDoctorById);
    router.post("/api/bulk-create-schedule-doctor", doctorController.postBulkCreateSchedule);

    router.get("/hoidanit", (req, res) => {
        return res.send("Hello word with hoidanit");
    });
    return app.use("/", router);
}
module.exports = initWebRouters;
