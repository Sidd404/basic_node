import { handleCatchError, handleSuccess } from "../../middlewares";
import UserServices from "./services";
import { Request, Response } from "express";

class UserController {
  static async signup(req: Request, res: Response) {
    try {
      let { email, password } = req.body;
      let user_exist = await UserServices.isUserExists(email);
      if (user_exist) {
        throw new Error("Email already registered. Please login in.");
      }
      const result: any = await UserServices.createUser(email, password);
      handleSuccess(res, result);
    } catch (error) {
      handleCatchError(res, error);
    }
  }
  static async login(req: Request, res: Response) {
    try {
      let { email, password } = req.body;
      const result: any = await UserServices.login(email, password);
      handleSuccess(res, result);
    } catch (error) {
      handleCatchError(res, error);
    }
  }
  static async verifyOtp(req: Request, res: Response) {
    try {
      let { email, otp } = req.body;
      const result: any = await UserServices.verifyOtp(email, otp);
      handleSuccess(res, result);
    } catch (error) {
      handleCatchError(res, error);
    }
  }
}
export default UserController;
