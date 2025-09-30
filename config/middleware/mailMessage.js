// mtblartxjuobkvnn  app password for send mail

const nodemailer = require('nodemailer')


module.exports.sendEmail =  async (msg) =>{
    const transporter = nodemailer.createTransport({
  port: 587,
  service : "gmail",
  secure: false, // true for 465, false for other ports
  auth: {
    user: "sanjanadholariya926@gmail.com",
    pass: "mtblartxjuobkvnn", // use here app password for send mail
  },
});

let res = await transporter.sendMail(msg);
return res;

}