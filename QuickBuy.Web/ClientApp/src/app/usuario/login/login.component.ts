import { Component, OnInit } from "@angular/core";
import { templateJitUrl } from "@angular/compiler";
import { Usuario } from "../../modelo/usuario";
import { Router, ActivatedRoute } from "@angular/router";
import { UsuarioServico } from "../../servicos/usuario/usuario.servico";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]

})
export class LoginComponent implements OnInit {
  public usuario
  public returnUrl: string;
  public mensagem: string;
  constructor( private router: Router, private activatedRouter: ActivatedRoute, private usuarioServico: UsuarioServico) {
    this.usuario = new Usuario();
    
  }
  ngOnInit(): void {
    this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'];
    this.usuario = new Usuario(); 
  }
  entrar() {

    this.usuarioServico.verificarUsuario(this.usuario).subscribe(
      usuario_json => {
        console.log(usuario_json);
        //essa linha sera executada em caso de retornos sem erro
        this.usuarioServico.usuario = usuario_json;

        if (this.returnUrl == null) {
          this.router.navigate(['/']);
        }

        else {
          this.router.navigate([this.returnUrl]);
        }


      },
      err => {
        console.log(err.error);
        this.mensagem = err.error;
      }
      
      
    )
    alert(this.mensagem);


}
  public imgsrc = "../assets/img/quic-logo2.jpg";

}
