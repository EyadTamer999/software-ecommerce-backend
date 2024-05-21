import { OrderGatewayService } from './order-gateway.service';
import { CreateOrderDTO } from './DTO/createOrder.dto';
export declare class OrderGatewayController {
    private readonly orderGatewayService;
    constructor(orderGatewayService: OrderGatewayService);
    createOrder(createOrderDto: CreateOrderDTO, request: any): Promise<any>;
    getOrdersHistory(request: any): Promise<any>;
    getOrder(id: string, request: any): Promise<any>;
    cancelOrder(id: string, request: any): Promise<any>;
    getOrderQueue(request: any): Promise<any>;
    getAllOrders(request: any): Promise<any>;
    updateOrderStatus(id: string, request: any): Promise<any>;
    updateOrderStatusClosed(id: string, request: any): Promise<any>;
}
