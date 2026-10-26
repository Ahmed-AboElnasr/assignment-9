import userModel from "../models/user.model.js";
import BaseRepository from "./base.repository.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(userModel);
  }

  findUserByEmail(email) {
    return this.findOneDocument({ email });
  }

  checkEmailExistsForOtherUser(email, excludeId) {
    return this.findOneDocument({ email, _id: { $ne: excludeId } });
  }
}

export default UserRepository;
