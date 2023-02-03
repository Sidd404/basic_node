import { Response, Request, NextFunction } from "express";
import { handleCatchError, Common } from "./index";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { authorization } = req.headers;
    let decoded_token: any = await Common.decodeToken(authorization);
    req.user = decoded_token;
    next();
  } catch (error) {
    handleCatchError(res, error);
  }
};

export { auth };
