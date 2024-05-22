import { Test, TestingModule } from '@nestjs/testing';
import { PaymentPaymobGatewayController } from './payment-paymob-gateway.controller';

describe('PaymentPaymobGatewayController', () => {
  let controller: PaymentPaymobGatewayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentPaymobGatewayController],
    }).compile();

    controller = module.get<PaymentPaymobGatewayController>(PaymentPaymobGatewayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
