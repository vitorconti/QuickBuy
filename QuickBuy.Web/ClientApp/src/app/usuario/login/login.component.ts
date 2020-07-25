import { Component } from "@angular/core";
import { templateJitUrl } from "@angular/compiler";
import { Usuario } from "../../modelo/usuario";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]

})
export class LoginComponent {
  public usuario
  

  constructor() {
    this.usuario = new Usuario();
  }
  entrar() {
    alert(this.usuario.email + ' - ' + this.usuario.senha);

  }
  public imgsrc = "../assets/img/quic-logo2.jpg";

}
