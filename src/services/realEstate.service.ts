import AppError from "../error";
import { realEstateInterface } from "../interfaces";
import {
  addressRepository,
  categoryRepository,
  realEstateRepository,
} from "../repositories";
import { realEstate } from "../schemas/realEstate.schema";

const create = async ({
  address,
  categoryId,
  ...body
}: realEstateInterface.CreateRealEstate): Promise<object | void> => {
  const category = await categoryRepository.findOneBy({ id: categoryId });

  if (!category) throw new AppError("Category is not found", 404);

  const newAddress = await addressRepository.save(address);

  const realEstate = await realEstateRepository.save({
    ...body,
    address: newAddress,
    category: category,
  });

  return realEstate;
};

const read = async (): Promise<object> => {
  const realEstates = await realEstateRepository
    .createQueryBuilder("re")
    .leftJoinAndSelect("re.address", "address")
    .getMany();

  return realEstates;
};

export { create, read };
