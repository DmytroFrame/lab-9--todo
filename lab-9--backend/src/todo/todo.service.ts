import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) {}

  create(createTodoDto: CreateTodoDto, userId: number) {
    return this.todoRepository.save({ ...createTodoDto, userId });
  }

  findAll(userId: number, isAdmin: boolean) {
    if (isAdmin) return this.todoRepository.find({ order: { createdAt: 'DESC' } });
    return this.todoRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  findOne(id: number) {
    return this.todoRepository.findOneBy({ id });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.update(id, updateTodoDto);
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
