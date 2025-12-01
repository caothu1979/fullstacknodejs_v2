import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = async (email, userPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExits = await db.User.findOne({
                where: { email: email }
            });
            if (isExits) {
                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(userPassword, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "ok";
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User not found`;
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's email not exist in the system, plz other email`;
            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }

    })
}
let checkUserEmail = async (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            });
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
}
let getAllUsers = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === "ALL") {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
            }
            resolve(users);
        } catch (error) {
            reject(error);
        }
    });
}
let hashCreatePassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            console.log(hashPassword);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            console.log('data email', data.email);
            console.log('check email', check);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: "Email is exist, Plz other email"
                });
            } else {
                const password = await hashCreatePassword(data.password);
                let user = await db.User.create({
                    email: data.email,
                    password: password,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    roleId: data.roleId,
                    phonenumber: data.phonenumber,
                    positionId: data.positionId
                });
                resolve({
                    errCode: 0,
                    errMessage: "ok"
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let editUpdateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data) {
                console.log("data id:", data.id);
                let user = await db.User.findOne({
                    where: {
                        id: data.id
                    },
                    raw: false
                });
                if (user) {
                    user.firstName = data.firstName;
                    user.lastName = data.lastName;
                    user.address = data.address;
                    user.phonenumber = data.phonenumber;
                    user.gender = data.gender === 1 ? true : false;
                    user.roleId = data.roleId;
                    await user.save();
                    resolve({
                        errCode: 0,
                        errMessage: "Update user is succeeds",
                    });
                }
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "User is not exist",

                });
            }
        } catch (e) {
            reject(e);
        }
    });
}
let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id) {
                let user = await db.User.findOne({
                    where: { id: id },
                    raw: false
                })
                if (!user) {
                    resolve({
                        errCode: 1,
                        errMessage: "User is not exist"
                    });
                }
                await user.destroy();
                resolve({
                    errCode: 0,
                    errMessage: "User deleted from system"
                });
            }
        } catch (e) {
            reject(e);
        }
    });

}
let getAllCodeService = async (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required parameters"
                })
            }
            else {
                let res = {};
                let allCode = await db.Allcodes.findAll({
                    where: { type: typeInput }
                })
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createUser: createUser,
    editUpdateUser: editUpdateUser,
    deleteUser: deleteUser,
    getAllCodeService: getAllCodeService
}