import { z } from "zod";

const user = z.object({
  id: z.number().positive(),
  name: z.string().max(45).min(0),
  email: z.string().email().max(45).min(0),
  admin: z.boolean().default(() => false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

const userCreate = user.omit({
  id: true,
  deletedAt: true,
  createdAt: true,
  updatedAt: true,
});

const userUpdate = userCreate.partial().omit({ admin: true });

const userReturn = user.omit({ password: true });

const userRead = userReturn.array();

export { user, userCreate, userUpdate, userRead, userReturn };
