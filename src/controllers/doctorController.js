import doctorService from "../services/doctorService";
let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server..."
        })
    }

}
let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        });

    }
}
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.postInforDetailDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        });
    }
}
let getDetailDoctorById = async (req, res) => {
    try {
        let reqId = req.query.id;
        console.log("Check id", reqId);
        let infor = await doctorService.getDetailDoctorByIdService(reqId);
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        });
    }

}
let postBulkCreateSchedule = async (req, res) => {
    try {
        console.log("Check data schedule:", req.body);
        let response = await doctorService.bulkCreateSchedule(req.body);
        console.log("Check response:", response);
        return res.status(200).json(response);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        });
    }
}
let getSheduleDoctorByDate = async(req,res) => {
    try {
       
        let response = await doctorService.scheduleDoctorByDate(req.query.doctorId,req.query.date);
        console.log("Check response:", response);
        return res.status(200).json(response);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        });
    }
}
let getExtraDoctorById = async(req, res) => {
     try {
       
        let response = await doctorService.getExtraDoctorById(req.query.doctorId);
        console.log("Check response:", response);
        return res.status(200).json(response);

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Server"
        });
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    postBulkCreateSchedule: postBulkCreateSchedule,
    getSheduleDoctorByDate: getSheduleDoctorByDate,
    getExtraDoctorById: getExtraDoctorById
}