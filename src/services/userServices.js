import db from "../models/index";
import bcrypt from "bcryptjs"
let handleUserLogin = async(email, userPassword) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isCheck = await checkUserEmail(email);
            console.log(isCheck);
            if (isCheck) {
                let user = await db.User.findOne({
                    email:email
                });
                console.log(user);
                if (user) {
                    let check = await bcrypt.compareSync(userPassword, user.password);
                    console.log(check);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "ok";
                        userData.user = user;
                    } else {
                        userData.errCode = 2;
                        userData.errMessage = `Wrong password!`;
                    }
                }
                else {
                    userData.errCode = 3;
                    userData.errMessage = `User not found`;

                    }
                }            
           
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email is not exits in system. plz other email`;
                
            }
            resolve(userData);
        } catch (e)
        {
            reject(e);
        }
    });
}
let checkUserEmail = async(userEmail) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let user = await db.User.findOne({
            where: { email:userEmail }
        });
        if (user) {
            resolve(true);
            }
        else {
            resolve(false);
            }

        } catch (e)
        {
            reject(e);
        }
      });
}
module.exports = {
    handleUserLogin:handleUserLogin
}