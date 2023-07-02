import AppError from "../error";
import { categoryInterface } from "../interfaces";
import { categoryRepository, realEstateRepository } from "../repositories";
import { categorySchema } from "../schemas";

const create = async (
  body: categoryInterface.CreateCategory
): Promise<categoryInterface.Category> => {
  const category = categoryRepository.create(body);
  await categoryRepository.save(category);

  return category;
};

const read = async (): Promise<categoryInterface.ReadCategory> => {
  const category = await categoryRepository.find();

  return category;
};

const readRealEstateByCat = async (
  categoryId: string
): Promise<categoryInterface.Category> => {
  const estates = await categoryRepository
    .createQueryBuilder("c")
    .leftJoinAndSelect("c.realEstate", "re")
    .where("c.id = :categoryId", { categoryId })
    .getOne();

  if (!estates) {
    throw new AppError("Category is not found.", 404);
  }

  return estates;
};

export { create, read, readRealEstateByCat };
