import { Subject } from 'rxjs/Subject';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router/router";
import { Observable } from "rxjs/Observable";


@Injectable()
export class AuthGuardService implements CanActivate {
  

  constructor(private authService:AuthService) { }
//   sendMessage(remitente: string,fecha:string,cuerpo:string,id:string) {
//     console.log(remitente);
   
// }



  
    canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot) {
      console.log(state.url);
    
      
     if(this.authService.isAuthenticated()){
       return true;
     }
      else{
               console.error('bloqueado por el guard');

        return false;
      }
  }

}
