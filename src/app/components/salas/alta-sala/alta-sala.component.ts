import { Observable } from 'rxjs/Observable';
import { BaseDatosService } from './../../../services/base-datos.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Constantes } from './../../../clases/constantes';
import { Component, OnInit } from '@angular/core';
import {QRCodeComponent} from 'angular2-qrcode';

@Component({
  selector: 'app-alta-sala',
  
  templateUrl: './alta-sala.component.html',
  styleUrls: ['./alta-sala.component.css']
})

export class AltaSalaComponent  {
    dragOperation: boolean = false;
    infantes:any[]=[];
    maestras:any[]=[];
    sala:any[]=[];
    formBusqueda:FormGroup;
    maestra='maestra';
    infante:string='infante';
    existeNombre:Boolean=false;
    colorSala:string='';
    valida_boton=false;    
    mostrarAlert=false;
    ocultarForm=false;
    
    elementType : 'url' | 'canvas' | 'img' = 'url';
    value : string = 'Techiediaries';
    public colors: any[] = [ {name: 'rojo',color:'#ad2121'},{name: 'azul',color:'#1e90ff'},
                                {name: 'amarillo',color:'#e3bc08'},{name: 'rosa',color:' #E91E63'},{name: 'purpura',color:'#9C27B0'}
                            ,{name: 'celeste',color:'#2196F3'},{name: 'verde',color:'#4CAF50'},{name: 'naranja',color:'#FF9800'} ];
    


                                //*FF9800

                                

                                

    constructor(public databseService:BaseDatosService){

        this.databseService.sinAsignar().subscribe(data=>{
            console.log(data);
            this.infantes=data.infantes;
            this.maestras=data.maestras;

        },error=>{
            console.log(error);
        })


        this.formBusqueda = new FormGroup({
            'nombre': new FormControl('', [Validators.required,Validators.minLength(3)])
          });

          this.formBusqueda.valueChanges.subscribe(data=>{
              console.log(data);
              this.existeSala(data.nombre)
           
          })
    }
    
    allowDropFunction(baseInteger: string): any {
        let  response:boolean=true;
        this.sala.forEach(element => {
          if(element.tipo === this.maestra){
              response= false;
          }
        
           });
          return (dragData: any) =>{
            if(dragData[2]===this.infante){
              return true;
            }else if(dragData[2] === this.maestra){
  
  
  
           return response;
  
  
         
          }else{
            return response;
            
          }
          
      }
    }
    addToMestras($event: any) {
        this.sala.push($event.dragData);
    }

    addToSala($event: any) {
        // objeto index source
        console.log($event.dragData[0]);

        let index=$event.dragData[1];
        if($event.dragData[2] ==this.maestra){
            this.maestras.splice(index, 1);
            $event.dragData[0].tipo=this.maestra;
            this.sala.unshift($event.dragData[0]);
            
            
            
        }else{
            this.infantes.splice(index, 1);
            $event.dragData[0].tipo=this.infante;
            this.sala.push($event.dragData[0]);
            
            
        }
        
         $event.dragData[0].tipo;

         this.valida_boton=this.validarMaestra();
         
    }
 existeSala(control:string){
     
      this.databseService.validarNombreSala(control).subscribe(data=>{
          console.log(data);
          if(data.existe){
              this.existeNombre=true;
          }else{
            this.existeNombre=false;
            
          }
      },error=>{
         console.log(error); 
      })
   
         
     
     
         

 }
 //elimina una tarjeta y la devuelve al array
 eliminarTarjeta(item:any,index:number){
     console.log(item.tipo);
if(item.tipo==this.infante){
    this.sala.splice(index, 1);
    this.infantes.unshift(item);

}else if(item.tipo==this.maestra){
    this.sala.splice(index, 1);
    
    this.maestras.unshift(item);
}


this.valida_boton=this.validarMaestra();


 }
 setearColor(color:string){
     this.colorSala=color;
 }
 enviar(){
     let random = Math.random().toString().slice(2,100);
     console.log(random);

if(random){
    return;
}     let ids= this.procesarSala();
     
     let nombre=this.formBusqueda.controls['nombre'].value;
     this.databseService.insertaSala(nombre,'10','1',this.colorSala,ids[0],ids[1]).subscribe(data=>{
         console.log( 'respuesta',data);
         if(!data.error){
            this.mostrarAlert = true;
            this.ocultarForm=true;
         }
     },error=>{
         console.log(error);
     })

 }


 procesarSala():string[]{
     let respuesta:string[]=[];
   let  id_maestra:string;
     let ids_infantes:string;
     this.sala.forEach(element => {
         console.log(element);
         if(element.tipo == this.infante){
        ids_infantes = (ids_infantes ? ids_infantes+','+element.id : element.id);
            
          

         }else if(element.tipo==this.maestra){
             id_maestra=element.id;
         }
         
     }

    );
    console.log(ids_infantes);
    console.log(id_maestra);
    
    respuesta.push(ids_infantes);
    respuesta.push(id_maestra);
    return respuesta;
    
 }
 validarMaestra():boolean{
    let maestra=false;
    let infante = false;
    for(let item of this.sala){
      if(item.tipo==this.maestra){
        maestra= true;
      }
      if(item.tipo==this.infante){
        infante= true;
      }




    }
    return (maestra && infante);
  }



}
    
   