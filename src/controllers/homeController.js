import CRUDservices from "../services/CRUDservices";
let getHomePage = (req, res) => {
    //return res.send("this is homepage");
   return res.render("homepage.ejs");
}
let getAboutPage = (req, res) => {
    return res.render("about.ejs");
}
let displayAllUsers = async(req, res) => {
    try {
    let data = await CRUDservices.getAllUsers();
    console.log(data.length);
        return res.render("displayCRUD.ejs", {
            data: data
        });
    }
    catch (e)
    {
        console.log(e);
    }
}
let createUsers = (req,res) => {
    return res.render("createusers.ejs");
}
let postCreateUsers = async(req, res) => {
    //console.log(req.body);
    await CRUDservices.createUser(req.body); 
    return res.send("Post from server");

}
let editUpdateUser = async(req,res) => {
    console.log(req.query.id);
    let userId = req.query.id;
    if (userId)
    {
    let newUser = await CRUDservices.updateUserById(userId);
    console.log(newUser);
    return res.render("editupdateuser.ejs",{
        newUser: newUser
    });
    }
    else {
       return res.send("Not Found an user"); 
    }
    
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    displayAllUsers: displayAllUsers,
    createUsers: createUsers,
    postCreateUsers: postCreateUsers,
    editUpdateUser: editUpdateUser
}
