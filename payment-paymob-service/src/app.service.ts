/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PayMobCreateOrderDTO } from './DTO/payment-order.dto';
import { json } from 'stream/consumers';
import { builtinModules } from 'module';

@Injectable()
export class AppService {
  readonly orderTestData = {
    auth_token: 'ZXlKaGlPaUpJVXpVeE1pSX1Y0NJmV5Sn...',
    delivery_needed: 'false',
    amount_cents: '100',
    currency: 'EGP',
    merchant_order_id: 5,
    items: [
      {
        name: 'ASC1515',
        amount_cents: '500000',
        description: 'Smart Watch',
        quantity: '1',
      },
      {
        name: 'ERT6565',
        amount_cents: '200000',
        description: 'Power Bank',
        quantity: '1',
      },
    ],
    shipping_data: {
      apartment: '803',
      email: 'claudette09@exa.com',
      floor: '42',
      first_name: 'Clifford',
      street: 'Ethan Land',
      building: '8028',
      phone_number: '+86(8)9135210487',
      postal_code: '01898',
      extra_description: '8 Ram , 128 Giga',
      city: 'Jaskolskiburgh',
      country: 'CR',
      last_name: 'Nicolas',
      state: 'Utah',
    },
    shipping_details: {
      notes: ' test',
      number_of_packages: 1,
      weight: 1,
      weight_unit: 'Kilogram',
      length: 1,
      width: 1,
      height: 1,
      contents: 'product of some sorts',
    },
  };

  private readonly logger = new Logger(AppService.name);
  private readonly apiKey: string = process.env.API_KEY;

  getHello(): string {
    return 'Hello World!';
  }

  async getPaymobPaymentKey(payment_info: PayMobCreateOrderDTO): Promise<any> {
    const url = 'https://accept.paymob.com/api/acceptance/payment_keys';

    const orderData = await this.getPayMobOrderID(payment_info);

    const auth_token = orderData.auth_token;
    const expiration = 3600;
    const order_id = orderData.response.id;
    const currency = 'EGP';
    const integration_id = 4573674;
    const lock_order_when_paid = 'false';

    const paymentKeyRequestData = {
      auth_token,
      expiration,
      order_id,
      currency,
      integration_id,
      lock_order_when_paid,
      amount_cents: payment_info.amount_cents,
      billing_data: {
        apartment: payment_info.shipping_data.apartment,
        email: payment_info.shipping_data.email,
        floor: payment_info.shipping_data.floor,
        first_name: payment_info.shipping_data.first_name,
        street: payment_info.shipping_data.street,
        building: payment_info.shipping_data.building,
        phone_number: payment_info.shipping_data.phone_number,
        shipping_method: 'PKG',
        postal_code: payment_info.shipping_data.postal_code,
        city: payment_info.shipping_data.city,
        country: payment_info.shipping_data.country,
        last_name: payment_info.shipping_data.last_name,
        state: payment_info.shipping_data.state,
      },
    };


    try {
      const response = await axios.post(url, paymentKeyRequestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.logger.log('Payment Key received');
      return response.data;
    } catch (error) {
      this.logger.error(
        'Error fetching Payment Key:',
        error.response?.data || error.message,
      );
      throw new Error('Failed to get Payment key');
    }
  }

  async getPayMobOrderID(order: PayMobCreateOrderDTO): Promise<any> {
    const url = 'https://accept.paymob.com/api/ecommerce/orders';
    const auth_token = await this.getPayMobAuthToken();

    const updatedOrder = {
      auth_token,
      ...order,
    };

    const data = JSON.stringify(updatedOrder);

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.logger.log('Order ID received');
      return { response: response.data, auth_token: auth_token };
    } catch (error) {
      this.logger.error('Error fetching order ID:', error);
      throw new Error('Failed to get Order ID');
    }
  }

  async getPayMobAuthToken() {
    const url = 'https://accept.paymob.com/api/auth/tokens';
    const data = { api_key: this.apiKey };

    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.logger.log('Authentication token received');
      return response.data.token;
    } catch (error) {
      this.logger.error('Error fetching auth token:', error);
      throw new Error('Failed to authenticate with Accept API');
    }
  }
}
