import AppError from "./app-error.js";
import Log from "../../logger/logger.js";

export default class DomainError extends AppError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    new Log().info(
      `DomainError: ${this.message} (Status Code: ${this.statusCode})`,
    );
  }
}
