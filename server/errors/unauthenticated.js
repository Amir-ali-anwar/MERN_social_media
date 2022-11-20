import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./CustomAPIError.js";

class unauthenticated extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default unauthenticated