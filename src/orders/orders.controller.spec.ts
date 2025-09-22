import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockOrdersService = {
    processOrders: jest.fn().mockReturnValue({
      pedidos: [{ caixas: [{ caixa_id: 'Caixa 2' }] }],
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order with a single box', () => {
    const simpleOrder = {
      pedidos: [
        {
          pedido_id: 1,
          produtos: [
            {
              produto_id: 'PS5',
              dimensoes: { altura: 40, largura: 10, comprimento: 25 },
            },
          ],
        },
      ],
    };

    const result = controller.createOrder(simpleOrder);
    
    expect(service.processOrders).toHaveBeenCalledWith(simpleOrder);

    expect(result.pedidos[0].caixas.length).toBe(1);
    expect(result.pedidos[0].caixas[0].caixa_id).toEqual('Caixa 2');
  });
});
