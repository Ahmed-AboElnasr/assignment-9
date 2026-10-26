import envConfig from "../../config/env.config.js";
import UserRepository from "../../DB/repository/user.repository.js";
import {
  compareTwoHashes,
  ConflictException,
  encrypt,
  generateToken,
  hash,
  UnauthorizedException,
} from "../../utils/index.js";

const userRepo = new UserRepository();

export const signUp = async (body) => {
  const { firstName, lastName, email, password, gender, role, age, phone } = body;

  const emailExist = await userRepo.findUserByEmail(email);
  if (emailExist) {
    throw new ConflictException("Email already exist", {
      dublicated_email: email,
    });
  }

  let encryptedPhone;
  if (phone) {
    encryptedPhone = encrypt(phone);
  }

  const hashedPassword = await hash(password);

  return userRepo.createDocument({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    gender,
    role,
    age,
    phoneNumber: encryptedPhone || undefined,
  });
};

export const logIn = async (body) => {
  const { email, password } = body;

  const isEmailExist = await userRepo.findUserByEmail(email);
  if (!isEmailExist) {
    throw new UnauthorizedException("Invalid email or password");
  }

  const isPasswordMatched = await compareTwoHashes(
    isEmailExist.password,
    password,
  );
  if (!isPasswordMatched) {
    throw new UnauthorizedException("Invalid email or password");
  }

  const accessToken = generateToken(
    { _id: isEmailExist._id, email: isEmailExist.email, role: isEmailExist.role },
    envConfig.jwt.user.secret,
    { expiresIn: envConfig.jwt.user.expiration },
  );
  return { message: "Login successfully", accessToken };
};
