import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CanActivatedDto } from './dto/can-activated.dto';
import { UpdateLicenseKeyDto } from './dto/update-license-key.dto';
import { LicenseKeyEntity } from './entities/license-key.entity';

@Injectable()
export class LicenseKeyService {
  constructor(
    @InjectRepository(LicenseKeyEntity)
    private readonly licenseKeyRepository: Repository<LicenseKeyEntity>,
  ) {}

  create() {
    return this.licenseKeyRepository.save({ key: randomUUID() });
  }

  async canActivated({ key, envSpec }: CanActivatedDto) {
    const keyFromDb = await this.licenseKeyRepository.findOneBy({ key });
    if (!keyFromDb) throw new ConflictException('key invalid.');
    if (keyFromDb.envSpec) {
      if (keyFromDb.envSpec !== envSpec) throw new ConflictException('key invalid.');
      return { isActivate: true, key };
    }
    this.licenseKeyRepository.update(keyFromDb.id, { envSpec });
    return { isActivate: true, key };
  }

  findAll() {
    return `This action returns all licenseKey`;
  }

  findOne(id: number) {
    return this.licenseKeyRepository.findOneBy({id});
  }

  update(id: number, updateLicenseKeyDto: UpdateLicenseKeyDto) {
    return this.licenseKeyRepository.update(id, updateLicenseKeyDto);
  }

  remove(id: number) {
    return this.licenseKeyRepository.delete(id);
  }
}
