import { Component, OnInit } from "@angular/core"
import { ProdutoServico } from "../servicos/produto/produto.servico";
import { Produto } from "../modelo/produto";
@Component({
  selector: "app-produto",
  templateUrl: "./produto.component.html",
  styleUrls:["./produto.component.css"]
})
export class ProdutoComponent implements OnInit {

  public produto: Produto;
  public arquivoSelecionado: File;
  public ativar_spinner: boolean;
  public mensagemRetorno: string;
  public mensagemRetornoSucesso: string;
  //este objeto do tipo produto permite que seja acessivel a sua manipulação através da sintaxe de binding
  //dentro do template correspondente da classe


  constructor(private produtoServico: ProdutoServico) {

  }

  ngOnInit(): void {
    this.produto = new Produto();
    }
  public inputChange(files: FileList) {
    this.arquivoSelecionado = files.item(0);
    this.ativar_spinner = true;
    this.produtoServico.enviarArquivo(this.arquivoSelecionado)
      .subscribe(
        nomeArquivo => {
          this.produto.nomeArquivo = nomeArquivo;
          console.log(nomeArquivo);
          this.ativar_spinner = false;
        },
        e => {
          console.log(e.error);
          this.ativar_spinner = false;
        });
  }
  public cadastrar() {
    this.ativarEspera();
    this.produtoServico.cadastrar(this.produto)
      .subscribe(
        produtoJson => {
          console.log(produtoJson);
          this.mensagemRetornoSucesso = produtoJson.descricao;
          this.desativarEspera();
        },
        e => {
          console.log(e.error);
          this.mensagemRetorno= e.error
          this.desativarEspera();
        }
      );
  }
  public ativarEspera(){

    this.ativar_spinner=true;
  }
  public desativarEspera(){

    this.ativar_spinner=false;
  }
  }


