import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BaseDatosService } from './base-datos.service';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {
  
  
 auth0 = new auth0.WebAuth({
   
    clientID: 'Xfy0Z6nmX1wHSazU6xOrqZcQlbzjOSnO',
    domain: 'guasonleo.auth0.com',
    responseType: 'token id_token',
    audience: 'https://guasonleo.auth0.com/userinfo',
    // redirectUri: 'http://localhost:4200/callback',  
        redirectUri: 'https://virtualkinder.com/callback',     
    
    scope: 'openid profile email'
  });
userProfile: any;
private tipo = new Subject<any>();


  constructor(public router: Router,private databaseService:BaseDatosService,private  afAuth: AngularFireAuth) {}
 
  public login(plataforma:string):Promise<any> {
    return new Promise(resolve=>{
      if(plataforma==="facebook"){
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(data_user=>{
          console.log(data_user.additionalUserInfo.profile);
          this.databaseService.ValidarPermisos(data_user.additionalUserInfo.profile,plataforma).subscribe(data=>{
            console.log('permiso', data);
            if(data.error){
              
              resolve(false);
            }else{
              if(data.tipo!=0){

                this.setSession(data_user.additionalUserInfo.profile,data.tipo,data.usuario.nombre,data.usuario.apellido,data.foto);
                this.sendMessage(data.tipo);
                
              }
              resolve(data.tipo);
             
            }
          })
          //  this.setSession(data.additionalUserInfo);
     
     
         }).catch(error=>{
           console.log(error);
         })
      }else if(plataforma==="google"){
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(data_user=>{
      console.log(data_user.additionalUserInfo);
      // console.log(data.additionalUserInfo.profile);
      this.databaseService.ValidarPermisos(data_user.additionalUserInfo.profile,plataforma).subscribe(data=>{
        console.log(data);
        if(data.error){
          resolve(false);
        }else{
          if(data.tipo!=0){
            this.setSession(data_user.additionalUserInfo.profile,data.tipo,data.usuario.nombre,data.usuario.apellido,data.foto);
            this.sendMessage(data.tipo);
            
          }
          resolve(data.tipo);
        }
        
      })
  
  
      }).catch(error=>{
        console.log(error);
      })
      }
    })

 
   
  
    
  }
  getMessage(): Observable<any> {
    return this.tipo.asObservable();
}


  //  // ...
  // public handleAuthentication(): void {
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken && authResult.idToken) {
  //       window.location.hash = '';
  //       this.setSession(authResult);
  //       this.router.navigate(['/home']);
  //     } else if (err) {
  //       this.router.navigate(['/home']);
  //       console.log(err);
  //     }
  //   });
  // }

  private setSession(authResult,tipo:string,nombre:string, apellido:string,foto:string) {

    // Set the time that the access token will expire at
     const expiresAt = JSON.stringify((50000000000 * 1000) + new Date().getTime());
    // console.log(authResult.idTokenPayload.email);
    // localStorage.setItem('access_token', authResult.accessToken);
    let _nombre = nombre+' '+apellido;
    localStorage.setItem('id_token', authResult.id);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('correo', authResult.email);
    localStorage.setItem('tipo', tipo);
    localStorage.setItem('nombre',_nombre);
    localStorage.setItem('foto', foto);
    
    
    
    
    let token= localStorage.getItem( 'tokenFirebase');
    if(token){
       this.databaseService.SendToken(token, authResult.email).subscribe(data=>
         {
           console.log('respuesta',data);
           // this.isAuthenticated();
         },error=>{

           console.log(error);
         });
      }



}

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this.afAuth.auth.signOut().then(data=>{
      console.log(data);
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('correo');
      localStorage.removeItem('tipo');
      localStorage.removeItem('nombre');
      localStorage.removeItem('foto');
      
    }).catch(error=>
    {
      console.log(error);
    })
    

    
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    let auxDate=new Date().getTime();

    if(auxDate < expiresAt){
        let tipo = localStorage.getItem('tipo');
      this.sendMessage(tipo);
     return true;
    }
    // return new Date().getTime() ;
    return false
  }
  sendMessage(tipo) {
    this.tipo.next({ 
      tipo: tipo           
     });
}


}
