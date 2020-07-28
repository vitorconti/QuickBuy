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
  constructor( private router: Router, private activatedRouter: ActivatedRoute, private usuarioServico: UsuarioServico) {
    this.usuario = new Usuario();
    
  }
  ngOnInit(): void {
    this.returnUrl = this.activatedRouter.snapshot.queryParams['returnUrl'];
  }
  entrar() {

    this.usuarioServico.verificarUsuario(this.usuario).subscribe(
      data => {
      },
      err => {

      }
      
    )
    
      ;
    /*
    if (this.usuario.email == "teste@teste.com" && this.usuario.senha == "123")
      sessionStorage.setItem("usuario-autenticado", "1");
      this.router.navigate([this.returnUrl])
*/
}
  public imgsrc = "../assets/img/quic-logo2.jpg";

}
