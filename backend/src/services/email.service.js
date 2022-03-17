/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
require('dotenv').config();

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_APP,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});
/* istanbul ignore next */
// if (config.env !== 'test') {
//   transport
//     .verify()
//     .then(() => logger.info('Connected to email server'))
//     .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
// }

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = {
    from: '"Clothing Securities! 👻" <truonghoanghuy98@gmail.com>',
    to,
    subject,
    html: text,
  };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://localhost:4000/reset-password/token=${token}`;
  const text = `<h3>Dear User,</h3>
  <p>To reset your password, </p>
  <div><a href=${resetPasswordUrl} target="_blank">Click here</a></div>
  <p>If you did not request any password resets, then ignore this email.</p>
  <h4>Thanks you so much !</h4>
  `;
  await sendEmail(to, subject, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
};
