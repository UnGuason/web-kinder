import { Constantes } from './../../clases/constantes';
import { BaseDatosService } from 'app/services/base-datos.service';
import { Component, OnInit } from '@angular/core';
import { MensajeriaService } from 'app/services/mensajeria.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
   notificaciones:any[]=[];
   infante:any;
   subscription: Subscription;
   correo:string;
   fecha:string;
   
  constructor(private basedeDatosService:BaseDatosService, private pushService: MensajeriaService) { 




  this.subscription = this.pushService.getNotify().subscribe(message => {
    console.log(message);
    this.notificaciones=[];
 
    this.basedeDatosService.traerNotificaciones(this.correo,this.fecha).subscribe(data=>{
      console.log(data);
      this.notificaciones=data.actividades;

    },error=>{
      console.log(error);
    })



   
  });
  }

  ngOnInit() {
    console.log('on init');
     this.correo= localStorage.getItem('correo');
     this.fecha= Constantes.getFecha() ;
       this.basedeDatosService.traerNotificaciones(this.correo,this.fecha).subscribe(data=>{
         console.log(data);
         this.notificaciones=data.actividades;
         this.infante=data.infante;

       },error=>{
         console.log(error);
       })




  }

}
