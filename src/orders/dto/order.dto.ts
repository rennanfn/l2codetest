import { ProductDto } from './product.dto';

export class OrderDto {
  pedido_id: number;
  produtos: ProductDto[];
}