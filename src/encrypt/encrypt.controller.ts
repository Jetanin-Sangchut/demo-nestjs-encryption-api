import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { EncryptService } from './encrypt.service';
import { EncryptDto, DecryptDto } from './dto/encrypt.dto';

@ApiTags('Encrypt')
@Controller('api')
export class EncryptController {
  constructor(private readonly service: EncryptService) {}

  @ApiBody({ type: EncryptDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully encrypted payload',
    schema: {
      example: {
        successful: true,
        error_code: '',
        data: {
          data1: 'string (RSA encrypted AES key)',
          data2: 'string (AES encrypted payload)',
        },
      },
    },
  })
  @Post('/get-encrypt-data')
  encrypt(@Body() body: EncryptDto) {
    return this.service.encrypt(body.payload);
  }

  @ApiBody({ type: DecryptDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully decrypted payload',
    schema: {
      example: {
        successful: true,
        error_code: '',
        data: {
          payload: 'original string',
        },
      },
    },
  })
  @Post('/get-decrypt-data')
  decrypt(@Body() body: DecryptDto) {
    return this.service.decrypt(body.data1, body.data2);
  }
}
