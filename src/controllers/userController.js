import userServices from "../services/userServices";
let handlelogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(password);
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
            user: userData.user? userData.user:{}  
        }
    );
    
}
let handleGetAllUsers = async(req, res) => {
    let id = req.body.id;
    console.log("ID", id);
    let users = await userServices.getAllUsers(id);
    console.log(users);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'ok',
        users
    });

}
module.exports = {
    handlelogin: handlelogin,
   handleGetAllUsers:handleGetAllUsers 
}