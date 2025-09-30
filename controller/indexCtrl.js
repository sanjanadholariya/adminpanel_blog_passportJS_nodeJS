const adminModel = require("../model/adminModel");
const bcrypt = require("bcrypt");
const mailMessage = require("../config/middleware/mailMessage");
const passport = require("passport");

module.exports.login = async (req, res) => {
  try {
    if(!req.isAuthenticated()){
     
      return res.render("login");
    }else{
      return res.redirect('/admin')
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    req.flash("success" , "Login Successfully")
    const admin = await adminModel.findOne({ email: req.body.email });
    if (admin) {
      if (
        admin.email == req.body.email &&
        (await bcrypt.compare(req.body.password, admin.password))
      ) {
        // console.log("match !");
        // res.cookie("admin", admin);
        return res.redirect("/admin");
      } else {
        console.log("Invalid Credentials !!");
        return res.redirect("/");
      }
    } else {
      console.log("no admin");
      return res.redirect("/");
    }
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.logoutUser = async (req, res) => {
  req.session.destroy(err => {
    if(err){
      console.log(err);
      
    }
    else{
      return res.redirect("/");

    }
  })
};

module.exports.forgotPassword = async (req, res) => {
  console.log("Forgot Password");
  return res.render("forgotPassword");
};

module.exports.checkOtpPage = async (req, res) => {
  try {
    
    return res.render("checkOtpPage");
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.sendMailWithOTP = async (req, res) => {
  try {
    let admin = adminModel.findOne({ email: req.body.email });

    if (!admin) {
      return res.redirect("/");
    }

    let OTP = Math.floor(Math.random() * 1000);
     
    let msg = {
      from: "sanjanadholariya926@gmail.com",
      to: "khanparautsav@gmail.com",
      subject: "Demo",
      html: `<p>Hello...!!</p>
    <p>Your One Time Password Is ${OTP}.</p>`,
    };
    await mailMessage.sendEmail(msg);
    console.log("Send Mail With OTP !");
    console.log(req.body.email);
    
    res.cookie("otp", OTP);
    res.cookie("email", req.body.email);
    return res.redirect("/checkOtpPage");
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.resetPasswordPage = async(req, res) => {
  try{
   
    return res.render('resetPasswordPage')
  }
  catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
}

module.exports.verifyOtp = async (req, res) => {
  console.log(req.body.otp);
  try{
    let otp = req.cookies.otp;
    console.log(otp);

    if(otp == req.body.otp){
      await res.clearCookie('otp')
      return res.redirect('/resetPasswordPage')
    }else{
      console.log("OTP is not match !!");
      
      return res.redirect('/checkOtpPage')
    }
    
  }catch(err){
    console.log(err);
    return res.redirect('/')
    
  }
};


module.exports.resetPassword = async(req,res)=>{
  console.log(req.body);

  let password = req.body.password;
  let cPassword = req.body.cPassword
  
  let email = req.cookies.email;

  console.log(email);

  let admin = await adminModel.findOne({email : email})
  console.log(admin);

  if(admin){
    if(password == cPassword){
      await res.clearCookie('email');
      let newPassword = bcrypt.hashSync(password , 10)
      console.log(newPassword);
      await adminModel.findByIdAndUpdate(admin._id , {password : newPassword})
      return res.redirect('/')
      

    }else{
      console.log("Both Password Does Not Match !!");
      return res.redirect('/resetPassword')
      
    }
  }else{
    console.log("Admin Is Not Exist !!");
    return res.redirect('/')
    
  }
}
