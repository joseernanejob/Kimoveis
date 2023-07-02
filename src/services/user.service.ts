import { User } from "../entities";
import AppError from "../error";
import { userInterface } from "../interfaces";
import { userRepository } from "../repositories";
import { userSchema } from "../schemas";

const create = async (
  body: userInterface.UserCreate
): Promise<userInterface.UserReturn | void> => {
  const user: User = userRepository.create(body);
  await userRepository.save(user);

  return userSchema.userReturn.parse(user);
};

const read = async (): Promise<userInterface.UserRead> => {
  const user = userSchema.userRead.parse(await userRepository.find());

  return user;
};

const update = async (
  body: userInterface.UserUpdate,
  admin: string,
  loggedId: number,
  user: User
): Promise<userInterface.UserReturn> => {
  body.admin = user.admin;
  if (admin || user.id == loggedId) {
    const userUpdate: User = userRepository.create({ ...user, ...body });
    await userRepository.save(userUpdate);

    return userSchema.userReturn.parse(userUpdate);
  } else {
    throw new AppError("Insufficient permission", 403);
  }
};

const destroy = async (user: User): Promise<void> => {
  await userRepository.softRemove(user);
};

export { create, read, update, destroy };
