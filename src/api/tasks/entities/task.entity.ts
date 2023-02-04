import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MaxLength, MinLength } from 'class-validator';
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  @MinLength(1)
  @MaxLength(30)
  @IsString()
  title: string;

  @Column()
  status: number;
}
