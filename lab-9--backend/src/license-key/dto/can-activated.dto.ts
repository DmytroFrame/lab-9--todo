import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CanActivatedDto {
  @ApiProperty()
  @IsString()
  key!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  envSpec?: string | null;
}
