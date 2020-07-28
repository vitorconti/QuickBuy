import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GuardaRotas implements CanActivate {
  
  constructor(private router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    //referencia o router aqui dessa classe para redirecionar para página referida que o usuário não está podendo acessar
    //essa classe é responsavel por tratar o nivelamento dos usuários.

    var autenticado = sessionStorage.getItem("usuario-autenticado");
    if (autenticado == "1") {
      return true;
    }
    this.router.navigate(['/entrar'], { queryParams: {returnUrl: state.url} });
        // se usurio autenticado
      return true;
    }
   

}
