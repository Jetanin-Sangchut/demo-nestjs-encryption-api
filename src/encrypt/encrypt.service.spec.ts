import { Test, TestingModule } from '@nestjs/testing';
import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  let service: EncryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptService],
    }).compile();

    service = module.get<EncryptService>(EncryptService);
  });

  it('should encrypt and decrypt properly', () => {
    const payload = 'Secret Message!';
    const encrypted = service.encrypt(payload);
    const decrypted = service.decrypt(
      encrypted.data.data1,
      encrypted.data.data2,
    );
    expect(decrypted.data.payload).toEqual(payload);
    expect(decrypted.data.payload).toBe(payload);
  });
});
