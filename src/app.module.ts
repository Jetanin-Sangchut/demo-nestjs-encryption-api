import { Module } from '@nestjs/common';
import { EncryptController } from './encrypt/encrypt.controller';
import { EncryptService } from './encrypt/encrypt.service';

@Module({
  imports: [],
  controllers: [EncryptController],
  providers: [EncryptService],
})
export class AppModule {}
