import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateDeedDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  points: number;
}
