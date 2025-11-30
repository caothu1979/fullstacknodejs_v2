import userServices from "../services/userServices";
let handlelogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: "Missing inputs parameter"
        });
    }
    let userData = await userServices.handleUserLogin(email, password);
    return res.status(200).json(
        {
            //message: "Hello work",
            //yourEmail: email,
            //yourPassword: password,
            //test:"test"
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            user: userData.user ? userData.user : {}
        }
    );

}
let handleGetAllUsers = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: {}
        });
    }

    let users = await userServices.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    });

}
let createNewUser = async (req, res) => {
    let message = await userServices.createUser(req.body);
    return res.status(200).json(message);
}
let handleEditUpdateUser = async (req, res) => {
    let userData = req.body;

    if (userData.id) {
        let data = await userServices.editUpdateUser(userData);
        return res.status(200).json(data);
    }
    else {
        return res.status(500).json("User is not exist111");
    }
}
let handleEditUpdateUser1 = async (req, res) => {
    let userData = req.body;

    if (userData.id) {
        let data = await userServices.editUpdateUser(userData);
        return res.status(200).json(data);
    }
    else {
        return res.status(500).json("User is not exist111");
    }
}
let handleDeleteUser = async (req, res) => {
    let id = req.body.id;
    console.log("ID USER:", id);
    if (id) {

        let message = await userServices.deleteUser(id);
        return res.status(200).json(message);
    }
    else {
        return res.status(200).json("User not found");
    }
}
let getAllCode = async (req, res) => {
    try {
        setTimeout(async() =>{
        let data = await userServices.getAllCodeService(req.query.type);
        console.log("Get allcode:", data);
        return res.status(200).json(data);
        },5000);
        
        

    } catch (e) {
        console.log('Get allcode error:', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        });
    }
}
module.exports = {
    handlelogin: handlelogin,
    handleGetAllUsers: handleGetAllUsers,
    createNewUser: createNewUser,
    handleEditUpdateUser: handleEditUpdateUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode
}