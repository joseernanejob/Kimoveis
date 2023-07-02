import { sign } from "jsonwebtoken";
import AppError from "../error";
import { userRepository } from "../repositories";
import "dotenv/config";
import { compare } from "bcryptjs";

const create = async (email: string, password: string): Promise<string> => {
  const user = await userRepository.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }
  const comparePassword = await compare(password, user.password);

  if (!comparePassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    { admin: user.admin },
    String(process.env.SECRET_KEY),
    { expiresIn: String(process.env.EXPIRES_IN), subject: String(user.id) }
  );

  return token;
};

export { create };
