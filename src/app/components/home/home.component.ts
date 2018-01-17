import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alta',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private authService:AuthService,private router:Router){

  }
  public page:number=1;

  public complete:boolean=false;

  ngOnInit() {
    let tipo = localStorage.getItem('tipo');
    if(this.authService.isAuthenticated() && tipo =="3"){
      this.router.navigate(['/actividad']);
      

    }

  }
  guardarCambios(){
    this.page=this.page+1;
    console.log(this.page);

  }
  catchInfanteComplete(user){
    console.log('callback',user);
     this.complete=true;
  }
  login(plataforma:string){
    this.authService.login(plataforma).then(data=>{
      console.log('home',data);
      if(data=='3'){
        this.router.navigate(['/actividad']);
        

      }
      localStorage.setItem('tipo',data);
    })
    
   
 }

}