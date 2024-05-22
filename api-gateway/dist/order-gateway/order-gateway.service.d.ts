import { ClientKafka } from '@nestjs/microservices';
export declare class OrderGatewayService {
    private readonly kafkaClient;
    constructor(kafkaClient: ClientKafka);
    createOrder(createOrderDto: any, jwtToken: any): Promise<any>;
    getOrdersHistory(jwtToken: any): Promise<any>;
    getOrder(id: string, jwtToken: any): Promise<any>;
    cancelOrder(id: string, jwtToken: any): Promise<any>;
    getOrderQueue(jwtToken: any): Promise<any>;
    getAllOrders(jwtToken: any): Promise<any>;
    updateOrderStatus(id: string, jwtToken: any): Promise<any>;
    updateOrderStatusClosed(id: string, jwtToken: any): Promise<any>;
}
