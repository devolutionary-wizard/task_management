import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  status: number;
}
