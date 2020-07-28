import { Component } from "@angular/core";
import { templateJitUrl } from "@angular/compiler";
import { Usuario } from "../../modelo/usuario";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]

})
export class LoginComponent {
  public usuario
  public usuarioAutenticado: boolean;
  public usuarios = ["usuario1", "usuario2", "usuario3", "usuario4", "usuario5"];
  constructor( private router: Router) {
    this.usuario = new Usuario();
  }
  entrar() {
    if (this.usuario.email == "teste@teste.com" && this.usuario.senha == "123")
      sessionStorage.setItem("usuario-autenticado","1");
      //localStorage.setItem("usuario-autenticado", "1");
      this.router.navigate(['/'])
  }
  public imgsrc = "../assets/img/quic-logo2.jpg";

}
