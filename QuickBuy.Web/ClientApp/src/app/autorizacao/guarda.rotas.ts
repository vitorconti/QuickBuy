import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UsuarioServico } from "../servicos/usuario/usuario.servico";

@Injectable({
  providedIn: 'root'
})
export class GuardaRotas implements CanActivate {
  
  constructor(private router: Router, private usuarioServico : UsuarioServico) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    //referencia o router aqui dessa classe para redirecionar para página referida que o usuário não está podendo acessar
    if (this.usuarioServico.usuario_autenticado()) {
      return true;
    }
    
    this.router.navigate(['/entrar'], { queryParams: {returnUrl: state.url} });
        // se usurio autenticado
      return false;
    }
   

}
