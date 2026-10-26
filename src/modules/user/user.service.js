import UserRepository from "../../DB/repository/user.repository.js";
import {
  ConflictException,
  decrtypt,
  encrypt,
  hash,
  NotFoundException,
} from "../../utils/index.js";

const userRepo = new UserRepository();

export const getProfileById = async (user) => {
  if (user.phoneNumber) {
    user.phoneNumber = decrtypt(user.phoneNumber);
  }

  return user;
};

export const getAllUsers = async (page = 1, limit = 2) => {
  if (page < 0) page = 1;
  if (limit < 0) limit = 2;

  page = Math.ceil(page);
  limit = Math.ceil(limit);

  const skip = (page - 1) * limit;

  const users = await userRepo.findWithBagination(skip, limit);
  if (!users) {
    throw new NotFoundException("Users not found");
  }

  const totalUsers = await userRepo.countDocuments();

  return { users, totalUsers, page, limit };
};

export const updateProfile = async (userId, body) => {
  const { firstName, lastName, email, password, role, gender, age, phone } = body;

  if (email) {
    const emailExist = await userRepo.checkEmailExistsForOtherUser(email, userId);
    if (emailExist) {
      throw new ConflictException("Email already exist", { dublicated_email: email });
    }
  }

  let hashedPassword;
  if (password) {
    hashedPassword = await hash(password);
  }

  let encryptedPhone;
  if (phone) {
    encryptedPhone = encrypt(phone);
  }

  const updateData = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    gender,
    age,
    phone: encryptedPhone,
  };
  const user = await userRepo.findByIdAndUpdateDocument(userId, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!user) {
    throw new NotFoundException("User not found", { not_found_id: userId });
  }

  return user;
};

export const deleteProfile = async (userId) => {
  const user = await userRepo.findByIdAndDeleteDocument(userId);
  if (!user) {
    throw new NotFoundException("User not found", { not_found_id: userId });
  }

  return user;
};
