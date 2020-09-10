import { Component, OnInit } from "@angular/core"
import { ProdutoServico } from "../../servicos/produto/produto.servico";
import { Produto } from "../../modelo/produto";
import { Router } from "@angular/router";

@Component({
  selector: "app-loja",
  templateUrl: "./loja.pesquisa.component.html",
  styleUrls: ["./loja.pesquisa.component.css"]
})

export class LojaPesquisaComponent implements OnInit {
  public produtos: Produto[];
  public _filterBy: string;
  public filteredProduct: Produto[] = [];
  ngOnInit(): void {

  }
  constructor(private produtoServico: ProdutoServico, private router: Router) {
    this.produtoServico.obterTodosProdutos().subscribe(
      produtos =>{
        this.produtos = produtos;
        this.filteredProduct = produtos;
    },
      e => {
        console.log(e.error)
      }
    );
  }
  public abrirProduto(produto: Produto) {
    sessionStorage.setItem('produtoDetalhe', JSON.stringify(produto));
    this.router.navigate(['/loja-detalhe-produto']);
  }
  set filter(value: string) {
      this._filterBy = value;
      this.filteredProduct = this.produtos.filter((produto: Produto) =>
        produto.nome.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > - 1);
    
  }
  get filter() {
    return this._filterBy;
  }
} 
