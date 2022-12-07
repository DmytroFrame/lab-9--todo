import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  registration(@Body() payload: RegistrationDto) {
    return this.authService.registration(payload)
  }

  @Post('/login')
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload)
  }

  

}
