import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { TodoEntity } from './entities/todo.entity';
import { User } from 'src/auth/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@ApiTags('Todos')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiCreatedResponse({ type: TodoEntity })
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @User() {id}: UserEntity) {
    return this.todoService.create(createTodoDto, id);
  }

  @ApiOkResponse({ type: TodoEntity, isArray: true })
  @Get()
  findAll(@User() {id, roles}: UserEntity) {
    return this.todoService.findAll(id, roles.length == 2);
  }

  @ApiOkResponse({ type: TodoEntity })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.todoService.remove(+id);
  }
}
