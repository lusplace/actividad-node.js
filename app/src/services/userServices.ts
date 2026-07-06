import { User } from "../models/User.model";

export const findUserWithPosts = async (id: number) => {
  return await User.findByPk(id, {
    include: [User.associations.posts],
  });
};
