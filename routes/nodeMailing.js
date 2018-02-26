const nodemailer = require('nodemailer');
module.exports = sendNodeMail;

// dummy data for testing purposes
// const user = { email: 'test@test.com', username: 'testuser', _id: 123, };
// require('dotenv').load();
// sendNodeMail(user, 'register');

function sendNodeMail(user, msgType) {
  console.log('nodeMailer triggered');

  // conditionally set url and output for production environments and messageTypes
  const url = setUrl();
  const output = setEmailOutput(user, msgType, url);
  const mailConfig = setMailConfig();

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Dank Tickets Fool!" <info@newoldroad.com>', // sender address
    to: user.email || process.env.ETH_MAIL_USER, // list of receivers
    subject: 'dank apps nodemailer test', // Subject line
    text: 'Hello Sir or Madam!', // plain text body
    html: output // html body
  };

  let transporter = nodemailer.createTransport(mailConfig);

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(err, info) {
    console.log('sendMail triggered');
    if (err) {
      console.log('Error occurred. ' + err.message);
      return process.exit(1);
    }
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // res.render('contact', { msg: 'Email has been sent' });
    // res.status(200).send('email sent');
  });
}

//// ===================== Helpers ===========================

function setUrl() {
  let url;
  if (process.env.NODE_ENV === 'production') {
    url = "https://danktickets.herokuapp.com"
  } else {
    url = "http://localhost:8000"
  }
  return url;
}

function setEmailOutput(user, msgType, url) {
  let output;
  switch (msgType) {
    case 'register':
      output = `
      <h2>Thank you for registering ${user.username} </h2>
      <p>Please click the following link to complete the registration process</p>
      <br>
      <a href="${url}/validate/${user._id.toString()}" target="_blank">
        CLICK ME!
      </a>
    `;
      break;
    case 'pw-reset':
      output = `
      <h2>Hello ${user.username} </h2>
      <p>Please click the following link to reset your password</p>
      <br>
      <a href="${url}/forgot-password/${user._id.toString()}" target="_blank">
        CLICK ME!
      </a>
    `;
      break;
    case 'send-tickets':
      output = `<h1>Here's Your tickets bitch</h1>`
  }
  return output;
}

function setMailConfig() {
  let mailConfig;
  // mailjet production
  if (process.env.NODE_ENV === 'production') {
    mailConfig = {
      host: process.env.MJ_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MJ_MAIL_USER,
        pass: process.env.MJ_MAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    };
  } else {
    // all emails are caught by ethereal.email
    mailConfig = {
      host: process.env.ETH_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.ETH_MAIL_USER,
        pass: process.env.ETH_MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    };
    // mailjet testing with local host
    /*   mailConfig = {
        host: 'in-v3.mailjet.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.MJ_MAIL_USER,
          pass: process.env.MJ_MAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      }; */
  }
  return mailConfig;
}