import { Component, OnInit } from "@angular/core"
import { Usuario } from "../../modelo/usuario"
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: "cadastro-usuario",
  templateUrl: "./cadastro.usuario.component.html",
  styleUrls: ["./cadastro.usuario.component.css"]
})
export class CadastroUsuarioComponent implements OnInit {
  public usuario: Usuario;
  public ativar_spinner: boolean;
  public mensagem: string;
  public usuarioCadastrado: boolean;
  public cadastroUsuario: FormGroup;
  constructor(private usuarioServico: UsuarioServico) {

  }

  ngOnInit(): void {
    this.usuario = new Usuario();
  }
  public cadastrar() {

    this.ativar_spinner = true;
    this.usuarioServico.cadastrarUsuario(this.usuario)
      .subscribe(
        // operação bem sucedida
        usuarioJson => {
          this.usuarioCadastrado = true;
          this.mensagem = "";
          this.ativar_spinner = false;
        },
        //operação mal sucedida

        e => {
          this.mensagem = e.error;
          this.ativar_spinner = false;
        }
       );


  }

}
