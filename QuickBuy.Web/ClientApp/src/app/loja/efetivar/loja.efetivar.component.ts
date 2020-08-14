import { Component, OnInit } from "@angular/core"
import { LojaCarrinhoCompras } from "../carrinho-compras/loja.carrinho.compras"
import { Produto } from "../../modelo/produto";
@Component({
  selector: "loja-efetivar",
  templateUrl: "./loja.efetivar.component.html",
  styleUrls: ['./loja.efetivar.component.css']
})
export class LojaEfetivarComponent implements OnInit {
  public carrinhoCompras: LojaCarrinhoCompras;
  public produtos: Produto[];
  public total: number;
  ngOnInit(): void {
    this.carrinhoCompras = new LojaCarrinhoCompras();
    this.produtos = this.carrinhoCompras.obterProdutos();
    this.atualizarTotal();
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
    this.atualizarTotal();
  }
  public atualizarTotal() {
    //acc é o contador
    this.total = this.produtos.reduce((acc, produto)=> acc+produto.preco,0);
  }
}
