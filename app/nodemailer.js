const nodemailer = require('nodemailer');

const user = process.env.EMAIL;
const pass = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass
  }
});

const mainInformation = {
  name: 'Manga Notification',
  address: user
};

exports.sendMail = (to, subject, html) => {
  const mailOptions = {
    mainInformation,
    to,
    subject,
    html
  };
  
  if (!user || !password) {
    const error = new Error('please provide email and password for nodemailer');
    throw error;
  }

  transporter.sendMail(mailOptions, (e, info) => {
    if (e) {
      console.error(e);
      return e;
    }
    console.log(info);
    return info;
  });
};
