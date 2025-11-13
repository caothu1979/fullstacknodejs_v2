import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = async(email, userPassword) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExits = await db.User.findOne({
                where: {email:email}
            });
            if (isExits) {
                let user = await db.User.findOne({
                    where: { email: email },
                    raw:true
                });
                if (user) {
                   let check = await bcrypt.compareSync(userPassword, user.password);
                   if (check) {
                    userData.errCode = 0 ;
                       userData.errMessage = "ok";
                       delete user.password;
                    userData.user = user;

                   }
                   else {
                    userData.errCode = 3 ;
                    userData.errMessage = "Wrong password";
                   }
                } else {
                    userData.errCode =2;
                    userData.errMessage =`User not found`;

                }            
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's email not exist in the system, plz other email`;          

            }
            resolve(userData);

        } catch(e) {
            reject(e);
        }

    }) }
        
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
let getAllUsers = async(userId) => {
    return new Promise(async(resolve, reject) => { 
        try {
            let users = '';
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude:['password']
                    }
                });
            }
            if(userId && userId !=='ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude:['password']
                    }
                });

            }
            resolve(users);

        } catch (error) {
            reject(error);
        }
        
    }); 
} 
let deleteUserById = (id) => {
    return new Promise(async(resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: "User is not exist",
                       
                });
            } else {
                let user = await db.User.findOne({
                    where: { id: id }
                });
                if (user) {
                    user.destroy();
                    resolve({
                    errCode: 0,
                    errMessage: "User delete from system",                  });
                } 
            }

        } catch (error) {
            reject(e);
        }
     });

}
let hashCreatePassword = async(password) => {
    return new Promise(async(resolve,reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch(e) {
            reject(e);
        }       
    })    
}
let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => { 

    });
}
module.exports = {
    handleUserLogin: handleUserLogin,
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    deleteUserById: deleteUserById
}