import { validate } from "class-validator";

export default abstract class DTO {
  public async validate(): Promise<void> {
    const errors = await validate(this);
    if (errors.length > 0) {
      const errorMessages = errors.map(error => Object.values(error.constraints ?? {})).join(", ");
      throw new TypeError(`Validation failed. Errors: ${errorMessages}`);
    }
  }
}