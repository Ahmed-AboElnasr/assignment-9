import envConfig from "../config/env.config.js";
import UserRepository from "../DB/repository/user.repository.js";
import { UnauthorizedException, verifyToken } from "../utils/index.js";

const userRepo = new UserRepository();

export const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedException("Authorization header is missing");
  }

  const [ prefix, token ] = authorization.split(" ");
  if (prefix !== "Bearer" || !token) {
    throw new UnauthorizedException("Invalid authorization header format");
  }

  const decodedToken = verifyToken(
    token,
    envConfig.jwt.user.secret,
  );

  // find user by id and attach it to the request object
  const user = await userRepo.findDocumentById(decodedToken._id);
  if (!user) {
    throw new UnauthorizedException("User no longer exists");
  }

  req.authUser = user;
  next();
};
