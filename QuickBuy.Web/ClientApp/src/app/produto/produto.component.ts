import { Component, OnInit } from "@angular/core"
import { ProdutoServico } from "../servicos/produto/produto.servico";
import { Produto } from "../modelo/produto";
import { Router } from "@angular/router";
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


  constructor(private produtoServico: ProdutoServico, private router: Router) {

  }

  ngOnInit(): void {
    var produtoSession = sessionStorage.getItem('produtoSession')
    if (produtoSession) {
      this.produto = JSON.parse(produtoSession)
    }
    else {
      this.produto = new Produto();
    }
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
          if (produtoJson != null)
          this.mensagemRetornoSucesso="Produto cadastrado com sucesso"
          console.log(produtoJson);
          this.desativarEspera();
          this.router.navigate(['/pesquisar-produto']);
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


