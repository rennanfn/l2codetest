export class DimensoesDto {
  altura: number;
  largura: number;
  comprimento: number;
}

export class ProductDto {
  produto_id: string;
  dimensoes: DimensoesDto;
}