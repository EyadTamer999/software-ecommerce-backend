import { UserGatewayService } from './user-gateway.service';
import { UpdateUserDTO } from './DTO/updateUser.dto';
export declare class UserGatewayController {
    private readonly userGatewayService;
    constructor(userGatewayService: UserGatewayService);
    updateProfile(user: UpdateUserDTO, request: any): Promise<any>;
    viewAddress(email: string): Promise<any>;
    addAddress(data: {
        email: string;
        label: string;
        address: string;
    }): Promise<any>;
    deleteAddress(data: {
        email: string;
        id: string;
    }): Promise<any>;
}
