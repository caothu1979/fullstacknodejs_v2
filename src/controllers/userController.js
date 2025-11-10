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
            userData:userData
        }
    );
    
}
module.exports = {
   handlelogin:handlelogin 
}