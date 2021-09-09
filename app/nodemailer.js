const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mrandi96@gmail.com',
    pass: 'Gamelovers#01'
  }
});

const mainInformation = {
  name: 'Manga Notification',
  address: 'mrandi96@gmail.com'
};

exports.sendMail = (to, subject, html) => {
  const mailOptions = {
    mainInformation,
    to,
    subject,
    html
  };

  transporter.sendMail(mailOptions, (e, info) => {
    if (e) {
      console.log(e);
      return e;
    }
    console.log(info);
    return info;
  });
};
