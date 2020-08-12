import { Injectable, Inject, OnInit } from "@angular/core"
import {HttpClient,HttpHeaders} from "@angular/common/http"
import {Observable} from "rxjs"
import { Produto } from "../../modelo/produto";
@Injectable({
  providedIn: "root"
})
export class ProdutoServico implements OnInit{
  
  private _baseUrl: string;
  public produtos: Produto[]; //declaração de lista em typescript

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    this._baseUrl = baseUrl;


  }

  ngOnInit(): void {
    this.produtos = [];
  }
  get headers(): HttpHeaders {

    return new HttpHeaders().set('content-type', 'application/json');
  }
  public cadastrar(produto: Produto): Observable<Produto> {

    //ensinado na aula 122 do curso a usar o recurso JSON.stringfy para substituir o body que estava sendo usado antes
    return this.http.post<Produto>
      (this._baseUrl + "api/produto", //caminho 
        JSON.stringify(produto), //antiga variavel body
        { headers: this.headers });
  }
  public salvar(produto: Produto): Observable<Produto> {
   
    return this.http.post<Produto>
      (this._baseUrl + "api/produto/salvar", //caminho
      JSON.stringify(produto), //conversao da classe modelo produto para um json
      { headers: this.headers }); // cabeçalho da requisição

  }
  public deletar(produto: Produto): Observable<Produto[]> {
    
    return this.http.post<Produto[]>
      (this._baseUrl + "api/produto/deletar",
        JSON.stringify(produto),
        { headers: this.headers });
  }
  public obterTodosProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this._baseUrl + "api/produto");
  }
  public obterProduto(produtoId: number): Observable<Produto> {
    return this.http.get<Produto>(this._baseUrl + "api/produto");
  }
  public enviarArquivo(arquivoSelecionado: File): Observable<string> {
    /*
     O form data é um tipo de estrutura de dados que permite que seja atribuido um objeto do tipo file
     isso é nativo do javascript msm


     */

    const formData: FormData = new FormData();
    // a chave arquivoEnviada será usada para dentro do produto controller para que seja possivel receber o arquivo dentro da requisição la dentro do servidor
    formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);
    return this.http.post<string>(this._baseUrl + "api/produto/enviarArquivo", formData);
  }

}
