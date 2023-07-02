import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Address } from "./addresses.entity";
import { Category } from "./categories.entity";
import { Schedule } from "./schedules.entity";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ default: false })
  sold: boolean;

  @Column({ default: 0, type: "decimal" })
  value: number | string;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @ManyToOne(() => Category, (category) => category.realEstate)
  category: Category;

  @OneToMany(() => Schedule, (s) => s.realEstate)
  schedules: Schedule[];
}

export { RealEstate };
