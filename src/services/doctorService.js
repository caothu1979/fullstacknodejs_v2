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
let getAllDoctors = () => {
     return new Promise(async (resolve, reject) => {
          try {
               let doctors = await db.User.findAll({
                    where: { roleId: 'R2' },
                    attributes: { exclude: ['password', 'image'] },
               });
               resolve({
                    errCode: 0,
                    data: doctors
               });
          } catch (e) {
               reject(e);
          }
     });
}
let postInforDetailDoctor = (inputData) => {
     return new Promise(async (resolve, reject) => {
          try {
               if (!inputData.doctorId || !inputData.contentHTML
                    || !inputData.contentMarkdown) {
                    resolve({
                         errCode: 1,
                         errMassage: "Missing required parameter"

                    })
               }
               else {
                    await db.markdown.create({
                         contentHTML: inputData.contentHTML,
                         contentMarkdown: inputData.contentMarkdown,
                         description: inputData.description,
                         doctorId: inputData.doctorId,
                    });
                    resolve({
                         errCode: 0,
                         errMassage: "Save information Doctor succeed"
                    });
               }

          } catch (e) {
               reject(e);
          }
     })
}
module.exports = {
     getDoctorHome: getDoctorHome,
     getAllDoctors: getAllDoctors,
     postInforDetailDoctor: postInforDetailDoctor
}