import { AppService } from 'src/app.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AppService);
    validate(payload: any): Promise<any>;
}
export {};
