import * as Models from "../../models";
import DAO from "../../DAO";
import { Common } from "../../middlewares/index";
import fs from "fs";
import path from "path";

class UserServices {
  static async createUser(email: string, password: string) {
    try {
      let encrypted_password = await Common.encryptPassword(password);
      let data = {
        email: email.toLowerCase(),
        password: encrypted_password,
      };
      let user = await DAO.saveDocument(Models.User, data);
      return { message: "User signup successful." };
    } catch (error) {
      throw new Error(error);
    }
  }
  static async login(email: string, password: string) {
    try {
      let user = await this.isUserExists(email);
      if (!user) {
        throw new Error("User not found.");
      }
      let verify_password = await Common.comparePassword(
        password,
        user.password
      );
      if (!verify_password) {
        throw new Error("Incorrect email or password.");
      }
      let otp = await Common.generate_otp(4);
      let data = {
        email,
        otp,
      };
      let query = {
        email: email.toLowerCase(),
      };
      let update = {
        otp: otp.toString(),
      };
      await DAO.findOneAndUpdate(Models.User, query, update, {});
      await this.send_otp(data);
      return { message: "Otp sent on mail. Please verify" };
    } catch (error) {
      throw new Error(error);
    }
  }
  static async verifyOtp(email: string, otp: string) {
    let query = {
      email: email,
    };

    let user: any = await DAO.getDetails(Models.User, query, {}, {});

    if (user.otp !== otp) {
      throw new Error("Invalid Otp");
    }
    user.otp = null;
    user.save();
    let payload = {
      _id: user._id,
      email: user.email,
    };
    let token = await Common.generateToken(payload);
    let response = {
      message: "User login successful.",
      token: token,
    };
    return response;
  }
  static async isUserExists(email: string) {
    try {
      let query = {
        email: email.toLowerCase(),
      };
      let user: any = await DAO.getData(Models.User, query, {}, {});
      if (user.length) {
        return user[0];
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  static async send_otp(data: any) {
    try {
      let { email, otp } = data;

      let subject = "Welcome : Please login via otp";
      let title = `Hi`;
      let message = `Your 4 digit’s verification code is ${otp}.`;

      let file_path = path.join(__dirname, "../../public/html/template_1.html");
      let html = fs.readFileSync(file_path, { encoding: "utf-8" });
      html = html.replace("%TITLE%", title);
      html = html.replace("%MESSAGE%", message);

      await Common.send_email(email, subject, html);
    } catch (err) {
      throw err;
    }
  }
}

export default UserServices;
