import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
let getAllUsers = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = db.User.findAll();
            resolve(users);
        } catch(e)
        {
            reject(e);
        }
    }) 
}
let hashCreatePassword = async(password) => {
    return new Promise(async(resolve,reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            console.log(hashPassword);
            resolve(hashPassword);
        } catch(e) {
            reject(e);
        }       
    })    
}
let createUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            const password = await hashCreatePassword(data.password);
            let user = await db.User.create({
                email: data.email,
                password: password,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phonenumber: data.phonenumber,
                positionId: data.positionId

            })
            resolve("Create an user");
        }
        catch (e) {
            reject(e);
        }
    });      
}
let updateUserById = async(id) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: true
            }
            );
            if(user){
                resolve(user);
            }
            else {
                resolve({});
            }
            
        } catch {
            reject(e);
        }
    });
} 
module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    hashCreatePassword: hashCreatePassword,
    updateUserById: updateUserById
}