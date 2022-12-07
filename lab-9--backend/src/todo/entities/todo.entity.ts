import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TodoEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: number;

  @ApiProperty()
  @Column()
  name!: string;

  @ApiProperty({default: ''})
  @Column({ type: 'text', default: '' })
  text?: string;

  @ApiProperty()
  @Column()
  userId!: number;

  @ManyToOne(() => UserEntity, (user) => user.todos)
  user?: UserEntity;

  @ApiProperty()
  @CreateDateColumn()
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt?: Date;
}
