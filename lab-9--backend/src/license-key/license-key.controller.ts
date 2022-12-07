import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LicenseKeyService } from './license-key.service';
import { UpdateLicenseKeyDto } from './dto/update-license-key.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/enums/user-role.enum';
import { Roles } from 'src/auth/decorators/role.decorator';
import { CanActivatedDto } from './dto/can-activated.dto';

@ApiTags('License keys')

@Controller('license-keys')
export class LicenseKeyController {
  constructor(private readonly licenseKeyService: LicenseKeyService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Post()
  create() {
    return this.licenseKeyService.create();
  }

  @Post('can-activated')
  canActivated(@Body() payload: CanActivatedDto) {
    return this.licenseKeyService.canActivated(payload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get()
  findAll() {
    return this.licenseKeyService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licenseKeyService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLicenseKeyDto: UpdateLicenseKeyDto) {
    return this.licenseKeyService.update(+id, updateLicenseKeyDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.licenseKeyService.remove(+id);
  }
}
