import { Produto } from "../../modelo/produto";

export class LojaCarrinhoCompras {
  public produtos: Produto[] = [];
  public adicionar(produto: Produto) {
    var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");
    if (!produtoLocalStorage) {
      //se nao existir nada no localstorage
      this.produtos.push(produto);
    } else {
      //se ja existir um unico item armezanado na sessao
      this.produtos = JSON.parse(produtoLocalStorage);
      this.produtos.push(produto);

    }
    localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));
  }
  public obterProdutos(): Produto[] {
    var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");
    if (produtoLocalStorage)
      return JSON.parse(produtoLocalStorage);
    return this.produtos;
  }
  public removerProduto(produto: Produto) {
    var produtoLocalStorage = localStorage.getItem("produtoLocalStorage");
    if (produtoLocalStorage) {
      this.produtos = JSON.parse(produtoLocalStorage);
      this.produtos = this.produtos.filter(p => p.id != produto.id);
      localStorage.setItem("produtoLocalStorage", JSON.stringify(this.produtos));
    }
  }
  public atualizar(produtos: Produto[]) {
    localStorage.setItem("produtoLocalStorage", JSON.stringify(produtos));
  }
  public temItensNoCarrinhoDeCompras() {
    var itens = this.obterProdutos()
    return (itens.length > 0);
  }
  limparCarrinhoCompras() {
    localStorage.setItem("produtoLocalStorage", "");
  }
}
