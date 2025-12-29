import db from "../models/index";
require('dotenv').config();
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
               console.log("Check input data:", inputData);
               if (!inputData.doctorId || !inputData.contentHTML
                    || !inputData.contentMarkdown || !inputData.action) {
                    resolve({
                         errCode: 1,
                         errMessage: "Missing required parameter"

                    })
               }
               else {
                    if (inputData.action === 'CREATE') {
                         await db.markdown.create({
                              contentHTML: inputData.contentHTML,
                              contentMarkdown: inputData.contentMarkdown,
                              description: inputData.description,
                              doctorId: inputData.doctorId,
                         });
                         resolve({
                              errCode: 0,
                              errMessage: "Create information Doctor succeed"
                         });
                    }
                    else if (inputData.action === 'EDIT') {
                         let doctorMarkdown = await db.markdown.findOne({
                              where: { doctorId: inputData.doctorId },
                              raw: false,
                         })
                         if (doctorMarkdown) {
                              doctorMarkdown.contentHTML = inputData.contentHTML;
                              doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                              doctorMarkdown.description = inputData.description;
                              doctorMarkdown.updatedAt = new Date();
                              await doctorMarkdown.save();
                         }
                         resolve({
                              errCode: 0,
                              errMessage: "Save information Doctor succeed"
                         });

                    }


               }

          } catch (e) {
               reject(e);
          }
     })
}
let getDetailDoctorByIdService = (inputId) => {
     return new Promise(async (resolve, reject) => {
          try {
               if (!inputId) {
                    resolve({
                         errCode: 1,
                         errMassage: "Missing required parameter"
                    })
               } else {
                    let data = await db.User.findOne({
                         where: { id: inputId },
                         attributes: { exclude: ['password'] },
                         include: [
                              { model: db.Allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                              { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                              { model: db.markdown },

                         ],
                         raw: false,
                         nest: true
                    });
                    if (data && data.image) {
                         data.image = new Buffer(data.image, 'base64').toString('binary');

                    }
                    if (!data) data = {};
                    resolve({
                         errCode: 0,
                         data: data
                    })
                    // console.log("Check data:", data);
               }


          } catch (e) {
               console.log(e);
               reject(e);
          }
     })

}
let bulkCreateSchedule = (inputData) => {
     return new Promise(async (resolve, reject) => {
          try {
               if (!inputData.arrSchedule || !inputData.doctorId || !inputData.date) {
                    resolve({
                         errCode: 1,
                         errMessage: "Missing required parameter"
                    })
               }
               else {
                    let schedule = inputData.arrSchedule;
                    if (schedule && schedule.length > 0) {
                         schedule = schedule.map(item => {
                              item.maxNumber = process.env.MAX_NUMBER_SCHEDULE;
                              return item;
                         });
                         console.log("Check schedule:", schedule);
                         let res = await db.schedule.bulkCreate(schedule);
                         resolve({
                              errCode: 0,
                              errMessage: "Create schedule succeed"
                         })
                    }
               }
          } catch (e) {
               reject(e);
          }
     })
}
module.exports = {
     getDoctorHome: getDoctorHome,
     getAllDoctors: getAllDoctors,
     postInforDetailDoctor: postInforDetailDoctor,
     getDetailDoctorByIdService: getDetailDoctorByIdService,
     bulkCreateSchedule: bulkCreateSchedule

}