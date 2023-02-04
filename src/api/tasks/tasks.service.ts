import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskReposity: Repository<Task>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await this.taskReposity.create(createTaskDto);
    return this.taskReposity.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return await this.taskReposity.find();
  }

  async findOne(id: number): Promise<Task | undefined> {
    return await this.taskReposity.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<any> {
    return await this.taskReposity.update(id, updateTaskDto);
    const updateTask = this.taskReposity.findOne({ where: { id: id } });
    if (updateTask) {
      return updateTask;
    }
    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: number): Promise<void> {
    const deleteResponse = await this.taskReposity.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
