import { z } from "zod";
import { categorySchema } from "../schemas";

type Category = z.infer<typeof categorySchema.category>;

type CreateCategory = z.infer<typeof categorySchema.createCategory>;

type ReadCategory = z.infer<typeof categorySchema.read>;

export { Category, CreateCategory, ReadCategory };
