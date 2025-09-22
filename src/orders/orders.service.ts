import { Injectable } from '@nestjs/common';
import { OrderRequestDto } from './dto/order-request.dto';
import { ProductDto } from './dto/product.dto';

type Box = {
  id: string;
  altura: number;
  largura: number;
  comprimento: number;
};

@Injectable()
export class OrdersService {
  private availableBoxes: Box[] = [
    { id: 'Caixa 1', altura: 30, largura: 40, comprimento: 80 },
    { id: 'Caixa 2', altura: 50, largura: 50, comprimento: 40 },
    { id: 'Caixa 3', altura: 50, largura: 80, comprimento: 60 },
  ];

  processOrders(orderRequest: OrderRequestDto) {
    return {
      pedidos: orderRequest.pedidos.map((pedido) => {
        const caixas = this.packProducts(pedido.produtos);
        return {
          pedido_id: pedido.pedido_id,
          caixas,
        };
      }),
    };
  }

  private packProducts(produtos: ProductDto[]) {
    const caixas: { caixa: Box | null; produtos: ProductDto[]; observacao?: string }[] = [];

    for (const produto of produtos) {
      let colocado = false;

      for (const c of caixas) {
        if (c.caixa && this.cabeNaCaixa(produto, c.caixa)) {
          c.produtos.push(produto);
          colocado = true;
          break;
        }
      }

      if (!colocado) {
        const caixaDisponivel = this.availableBoxes.find((box) =>
          this.cabeNaCaixa(produto, box),
        );

        if (!caixaDisponivel) {
          caixas.push({
            caixa: null,
            produtos: [produto],
            observacao: 'Produto não cabe em nenhuma caixa disponível.',
          });
        } else {
          caixas.push({ caixa: caixaDisponivel, produtos: [produto] });
        }
      }
    }

    return caixas.map((c) => ({
      caixa_id: c.caixa ? c.caixa.id : null,
      produtos: c.produtos.map((p) => p.produto_id),
      ...(c.observacao ? { observacao: c.observacao } : {}),
    }));
  }

  private cabeNaCaixa(produto: ProductDto, caixa: Box): boolean {
    const { altura, largura, comprimento } = produto.dimensoes;

    return (
      altura <= caixa.altura &&
      largura <= caixa.largura &&
      comprimento <= caixa.comprimento
    );
  }
}
