import db from "../models/index";
let getDoctorHome = (limitInput) => {
     return new Promise(async (resolve, reject) => {
          try {
               let users = await db.User.findAll({
                    where: { roleId: 'R2' },
                    limit: limitInput,
                    order: [['createdAt', 'DESC']],
                    attributes: { exclude: ['password'] },
                    include: [
                         { model: db.Allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                         { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true
               })
               resolve({
                    errCode: 0,
                    data: users
               })
          } catch (e) {
               reject(e);
          }

     })
}
module.exports = {
     getDoctorHome: getDoctorHome
}