import { ApiProperty } from '@nestjs/swagger';
import { TodoEntity } from 'src/todo/entities/todo.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';

@Entity()
export class UserEntity {
	@ApiProperty()
	@PrimaryGeneratedColumn()
	id?: number;

	@ApiProperty()
	@Column()
	email!: string;

	@Column({ select: false })
	password!: string;

	@ApiProperty({ enum: UserRole, isArray: true, default: [UserRole.User] })
	@Column({ type: 'enum', enum: UserRole, array: true, default: [UserRole.User] })
	roles?: UserRole[];

	@OneToMany(() => TodoEntity, (todo) => todo.user)
	todos?: TodoEntity[];

	@ApiProperty()
	@CreateDateColumn()
	createdAt?: Date;

	@ApiProperty()
	@UpdateDateColumn()
	updatedAt?: Date;
}
