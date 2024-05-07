/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserGatewayService } from './user-gateway.service';
import { CreateUserDto } from './DTO/Create-User.dto';

@Controller('Users')
export class UserGatewayController {
  constructor(private readonly userGatewayService: UserGatewayService) {}



}
