import { Controller, Post, Body, ValidationPipe, UseGuards  } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderRequestDto } from './dto/order-request.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('processar')
  @ApiOperation({ summary: 'Processa pedidos para otimizar o empacotamento' })
  @ApiBody({ type: OrderRequestDto })
  @ApiResponse({ status: 200, description: 'Empacotamento processado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  createOrder(@Body(new ValidationPipe()) orderRequest: OrderRequestDto) {
    return this.ordersService.processOrders(orderRequest);
  }
}
