import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPaymobGatewayService } from './payment-paymob-gateway.service';

describe('PaymentPaymobGatewayService', () => {
  let service: PaymentPaymobGatewayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentPaymobGatewayService],
    }).compile();

    service = module.get<PaymentPaymobGatewayService>(PaymentPaymobGatewayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
