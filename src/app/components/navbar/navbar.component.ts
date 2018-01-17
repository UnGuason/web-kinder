import { Subscription } from 'rxjs/Subscription';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isNavbarCollapsed:true;
  subscription: Subscription;
  
  ngOnInit() {
  }
tipo:string;
nombre:string;
foto:string;
  constructor(public authService:AuthService) {
        // authService.handleAuthentication();
        this.subscription = this.authService.getMessage().subscribe(message => {
          this.tipo= localStorage.getItem('tipo');
          this.nombre= localStorage.getItem('nombre');

          this.foto= localStorage.getItem('foto');
          
          

  })
}

  login(){
    
  }
  logout(){
    this.authService.logout();
  }

}
