import db from "../models/index";
let getDoctorHome = (limitInput) =>{
          return new Promise(async (resolve, reject) => {
                    try {
                    let users = await db.User.findAll({
                     where: {roleId:'R2'},        
                     limit: limitInput,
                     order: [['createdAt','DESC']],
                    attributes: { exclude: ['password'] },                             
                    })
                    resolve({
                     errCode: 0,
                     data: users         
                    })
                    }catch(e){
                              reject(e);
                    }

          })
}
module.exports = {
     getDoctorHome:getDoctorHome     
}