import { Test, TestingModule } from '@nestjs/testing';
import { ProductGatewayService } from './product-gateway.service';

describe('ProductGatewayService', () => {
  let service: ProductGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductGatewayService],
    }).compile();

    service = module.get<ProductGatewayService>(ProductGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
