import { Component, OnInit } from "@angular/core"
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras"
import { Produto } from "../../modelo/produto";
import { Pedido } from "../../modelo/pedido";
import { ItemPedido } from "../../modelo/itempedido";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { PedidoServico } from "../../servicos/pedido/pedido.servico";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: "loja-efetivar",
  templateUrl: "./loja.efetivar.component.html",
  styleUrls: ['./loja.efetivar.component.css']
})
export class LojaEfetivarComponent implements OnInit {
  public carrinhoCompras: LojaCarrinhoCompras;
  public produtos: Produto[];
  public total: number;
  cadastroPedido: FormGroup;

  ngOnInit(): void {
    this.carrinhoCompras = new LojaCarrinhoCompras();
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.atualizarTotal();
    this.cadastroPedido = this.fb.group({
      cep : ['', Validators.required],
      cidade : ['', Validators.required],
      enderecoCompleto : ['', Validators.required],
      numeroEndereco : ['', Validators.required],
      estado : ['', Validators.required],
      formaPagamento : ['', Validators.required]
    });
  }
  constructor(private usuarioServico: UsuarioServico,
               private pedidoServico: PedidoServico, private router: Router,
               private fb: FormBuilder ) {

  }
  public verificarCarrinho() {
    const teste = this.carrinhoCompras.temItensNoCarrinhoDeCompras();
    if (teste) {
      return this.carrinhoCompras.temItensNoCarrinhoDeCompras();
    } else {
      this.router.navigate(['/']);
    }
  }
  public atualizarPreco(produto: Produto, quantidade: number) {
    if (!produto.precoOriginal)
      produto.precoOriginal = produto.preco;
    produto.preco = produto.precoOriginal * quantidade;
    if (quantidade <= 0) {
      quantidade = 1;
      produto.quantidade = quantidade;
    }

    this.carrinhoCompras.atualizar(this.produtos);
    this.atualizarTotal();
  }
  public removerProduto(produto: Produto) {
    this.carrinhoCompras.removerProduto(produto);
    this.produtos = this.carrinhoCompras.obterProdutos();

    if (this.verificarCarrinho()) {
      this.atualizarTotal();
    } else {
      this.router.navigate(['/']);
    }
  }
  public atualizarTotal() {
    //acc é o contador
    this.total = this.produtos.reduce((acc, produto) => acc + produto.preco, 0);
  }
  public efetivarCompra() {
    this.pedidoServico.efetivarCompra(this.criarPedido())
      .subscribe(
        pedidoId => {
          console.log(pedidoId);
          sessionStorage.setItem("pedidoId", pedidoId.toString());
          this.produtos = [];
          this.carrinhoCompras.limparCarrinhoCompras();
          this.router.navigate(["/compra-realizada-sucesso"])
        },
        e => {
          console.log(e.error);
        })
  }
  public criarPedido(): Pedido {
    const pedido = new Pedido();
    pedido.usuarioId = this.usuarioServico.usuario.id;
    pedido.cep = "15515";
    pedido.cidade = "Macaubal";
    pedido.enderecoCompleto = "sao paulo macaubal rua dos driussi";
    pedido.estado = "São Paulo";
    pedido.dataPrevistaEntrega = new Date();
    pedido.formaPagamentoId = 1;
    pedido.numeroEndereco = "58";

    this.produtos = this.carrinhoCompras.obterProdutos();
    // esse laço serve para preencher a lista de itempedidos dentro da classe do pedido
    for (const produto of this.produtos) {
      const itemPedido = new ItemPedido();
      itemPedido.produtoId = produto.id;
      if (!produto.quantidade) {
        produto.quantidade = 1;
      }
      itemPedido.quantidade = produto.quantidade;
      pedido.itensPedido.push(itemPedido);

    }

    return pedido;
  }
}
