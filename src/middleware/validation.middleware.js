import { isValidObjectId } from "mongoose";
import { BadRequestException } from "../utils/index.js";

export const validation = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (!validationResult.success) {
      throw new BadRequestException(
        "Validation error",
        validationResult.error.issues,
      );
    }
    
    req.validat = validationResult.data;
    next();
  };
};

// export const validateObjectId = (paramName = "id") => (req, res, next) => { 
//     const id = req.params[paramName];
//     if (!isValidObjectId(id)) {
//       throw new BadRequestException("Invalid ID format", { [paramName]: id });
//     }
//     next();
//   };
