import { z } from "zod";
import { userSchema } from "../schemas";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../entities";

type UserCreate = z.infer<typeof userSchema.userCreate>;
type UserUpdate = DeepPartial<UserCreate>;
type UserRead = z.infer<typeof userSchema.userRead>;
type UserReturn = z.infer<typeof userSchema.userReturn>;

type UserRepo = Repository<User>;

export { UserCreate, UserUpdate, UserRead, UserRepo, UserReturn };
