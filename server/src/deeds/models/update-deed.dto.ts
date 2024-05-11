import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdateDeedDto {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsNumber()
  points?: number;

  @IsBoolean()
  completed?: boolean;
}
