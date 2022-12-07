import { Module } from '@nestjs/common';
import { LicenseKeyService } from './license-key.service';
import { LicenseKeyController } from './license-key.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenseKeyEntity } from './entities/license-key.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LicenseKeyEntity])],
  controllers: [LicenseKeyController],
  providers: [LicenseKeyService]
})
export class LicenseKeyModule {}
