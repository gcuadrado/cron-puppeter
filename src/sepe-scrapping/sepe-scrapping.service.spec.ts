import { Test, TestingModule } from '@nestjs/testing';
import { SepeScrappingService } from './sepe-scrapping.service';

describe('SepeScrappingService', () => {
  let service: SepeScrappingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SepeScrappingService],
    }).compile();

    service = module.get<SepeScrappingService>(SepeScrappingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
