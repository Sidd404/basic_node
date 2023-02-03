require("dotenv").config();
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { handleCatchError } from "./index";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
var path = require("path");
import random_string from "randomstring";


const nodemailer_email = process.env.NODEMAILER_MAIL;
const nodemailer_password = process.env.NODEMAILER_PASSWORD;

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: nodemailer_email,
      pass: nodemailer_password,
    },
  })
);

class Common {
  static async generate_otp(len: any){
    try {
      let options = {
        length: len,
        charset: "123456789",
      };
      let otp = random_string.generate(options);
      return otp;
    } catch (err) {
      throw err;
    }
  };
  static async send_email(to: string, subject: string, body: any) {
    try {
      let mailOptions = {
        from: nodemailer_email,
        to: to,
        subject: subject,
        html: body,
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (err) {
      throw err;
    }
  }
  static async pagination(page: string, limit: string) {
    let new_limit = !limit
      ? parseInt(process.env.DEFAULT_LIMIT)
      : parseInt(limit);
    let skip = !page || page == "0" ? 0 : (parseInt(page) - 1) * new_limit;
    return { skip, new_limit };
  }

  static async generateToken(data: any) {
    return new Promise((resolve, reject) => {
      try {
        let secret_key = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(data, secret_key, { expiresIn: "1h" });
        return resolve(token);
      } catch (error) {
        throw reject(error);
      }
    });
  }
  static async decodeToken(token: string) {
    let secret_key = process.env.JWT_SECRET_KEY;
    let decoded = await jwt.verify(token, secret_key);
    return decoded;
  }
  static async encryptPassword(password: string) {
    const salt = genSaltSync(10);
    const encryptPassword = hashSync(password, salt);
    return encryptPassword;
  }
  static async comparePassword(password: string, hash: string) {
    const result = compareSync(password, hash);
    return result;
  }
}

export default Common;
