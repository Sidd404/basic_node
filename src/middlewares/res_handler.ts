import express from "express";
import * as Models from "../models";

const handleCatchError = (res: express.Response, error: any) => {
  let { type, status_code, message } = error;
  console.log("catch error-", error)
  if (type == undefined) {
    type = "Bad Request";
  }
  if (status_code == undefined) {
    status_code = 400;
  }
  if (message == undefined) {
    message = error;
  }

  res.status(status_code).send({
    success: false,
    error: type,
    error_description: message,
  });
  res.end();
};

const handleSuccess = (
  res: express.Response,
  response: any,
) => {
  let data: any = {
    success: true,
    data: response,
  };
  
  res.send(data);
};


const handleJoiError = async (error: any) => {
  let error_message = error.details[0].message;
  let custom_message = error_message.replace(/"/g, "");
  throw {
    status_code: 400,
    type: "Joi Error",
    error_message: custom_message,
  };
};



export { handleCatchError, handleSuccess, handleJoiError };
