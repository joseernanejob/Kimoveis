import { Schedule, User } from "../entities";
import AppError from "../error";
import { scheduleInterface, userInterface } from "../interfaces";
import {
  realEstateRepository,
  scheduleRepository,
  userRepository,
} from "../repositories";

const create = async (
  body: scheduleInterface.CreateSchedule,
  user: User
): Promise<string> => {
  const realEstate = await realEstateRepository.findOneBy({
    id: body.realEstateId,
  });
  if (!realEstate) throw new AppError("RealEstate not found", 404);

  const schedule = scheduleRepository.create({
    ...body,
    user: user,
    realEstate: realEstate,
  });

  await scheduleRepository.save(schedule);

  return "Schedule created";
};

const read = async (realEstateId: string) => {
  const realEstate = await realEstateRepository.findOneBy({
    id: Number(realEstateId),
  });
  if (!realEstate) throw new AppError("RealEstate not found", 404);

  const schedules = await realEstateRepository
    .createQueryBuilder("re")
    .leftJoinAndSelect("re.address", "a")
    .leftJoinAndSelect("re.category", "ca")
    .leftJoinAndSelect("re.schedules", "s")
    .leftJoinAndSelect("s.user", "u")
    .getOne();

  return schedules;
};

export { create, read };
