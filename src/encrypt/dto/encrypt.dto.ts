import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EncryptDto {
  @ApiProperty({ example: 'Hello World', maxLength: 2000 })
  @IsString()
  @Length(1, 2000)
  payload: string;
}

export class DecryptDto {
  @ApiProperty({ example: 'base64-encrypted-aes-key' })
  @IsString()
  data1: string;

  @ApiProperty({ example: 'base64-encrypted-payload' })
  @IsString()
  data2: string;
}
