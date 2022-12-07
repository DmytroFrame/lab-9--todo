import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import { sign } from 'jsonwebtoken';

const jwtSecretKey = 'superSecret';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  registration(payload: RegistrationDto) {
    payload.email = payload.email.toLowerCase()
    return this.userService.create(payload);
  }

  async login(payload: LoginDto) {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) throw new NotFoundException('User by email not found.');
    if (!(await this.comparePassword(payload.password, user.password))) throw new ConflictException('Ivalid password.');

    return {token: this.generateToken(user)}
  }

  private generateToken({ id, email, roles }: UserEntity): string {
    return sign({ id, email, roles }, jwtSecretKey, { expiresIn: '1h' });
  }

  private comparePassword(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
