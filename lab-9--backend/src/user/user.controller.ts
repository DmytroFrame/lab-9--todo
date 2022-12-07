import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/role.decorator';
import { UserRole } from './enums/user-role.enum';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	
	@ApiCreatedResponse({ type: UserEntity })
	@Roles(UserRole.Admin)
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@ApiOkResponse({ type: UserEntity, isArray: true })
	@Roles(UserRole.Admin)
	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@ApiOkResponse({ type: UserEntity })
	@Roles(UserRole.Admin)
	@Get(':id')
	findOne(@Param('id', ParseIntPipe) id: string) {
		return this.userService.findOne(+id);
	}

	@Roles(UserRole.Admin)
	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Roles(UserRole.Admin)
	@Delete(':id')
	remove(@Param('id', ParseIntPipe) id: string) {
		return this.userService.remove(+id);
	}
}
