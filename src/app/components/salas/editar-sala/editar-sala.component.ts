import { ActivatedRoute } from '@angular/router';
import { element } from 'protractor';
// import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { BaseDatosService } from './../../../services/base-datos.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Constantes } from './../../../clases/constantes';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-editar-sala',
  templateUrl: './editar-sala.component.html',
  styleUrls: ['./editar-sala.component.css']
})


export class EditarSalaComponent implements OnInit  {

  sala_original: any[] = [];
    valida_boton=false;    

    infantes_sin_asignar:any[]=[];
    infantes_sala:any[]=[];
    maestra_sala;
    
    maestras_sin_asignar:any[]=[];
    sala:any[]=[];
    formBusqueda:FormGroup;
    maestra='maestra';
    infante:string='infante';
    existeNombre:Boolean=false;
    colorSala:string='';
    hayMaestraSala:boolean=false;
    id_sala:string;
    nombre_sala:string="";
    color:string;
    mostrarAlert=false;
    
    

    public colors: any[] = [ {name: 'rojo',color:'#ad2121'},{name: 'azul',color:'#1e90ff'},
                                {name: 'amarillo',color:'#e3bc08'},{name: 'rosa',color:' #E91E63'},{name: 'purpura',color:'#9C27B0'}
                            ,{name: 'celeste',color:'#2196F3'},{name: 'verde',color:'#4CAF50'},{name: 'naranja',color:'#FF9800'} ];
    


                                //*FF9800

                                

                                

    constructor(public databseService:BaseDatosService,private route:ActivatedRoute){

     
      
    }
    ngOnInit(): void {
      
      this.sala_original=this.sala;
  
  
      this.route.params.subscribe(params => {
        
         //obtengo el parametro del id
           this.id_sala = params['id'];
           console.log(this.id_sala);

           this.databseService.sinAsignar().subscribe(data=>{
            console.log(data);
            this.infantes_sin_asignar=data.infantes;
            this.maestras_sin_asignar=data.maestras;
            this.databseService.traerSala(this.id_sala).subscribe(data=>{
              if(!data.error){
                this.infantes_sala=data.infantes;
                this.maestra_sala=data.maestra;
                this.nombre_sala=data.sala.nombre;
                this.color=data.sala.color;
                
      
                this.infantes_sala.forEach(element => {
                  element.tipo=this.infante;
                  this.sala.push(element);
                  
                });
                this.maestra_sala.tipo=this.maestra;
                this.sala.unshift(this.maestra_sala);
                console.log('asignacion');
      
              }
      
      
              })
        },error=>{
            console.log(error);
        })
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
        
        
            this.maestras_sin_asignar.splice(index, 1);
            $event.dragData[0].tipo=this.maestra;
            this.sala.unshift($event.dragData[0]);
            
        
            
            
        }else{
            this.infantes_sin_asignar.splice(index, 1);
            $event.dragData[0].tipo=this.infante;
            this.sala.push($event.dragData[0]);
            
            
        }
        
         this.valida_boton=this.validarMaestra();
         console.log(this.valida_boton);
         
    }
 
//  elimina una tarjeta y la devuelve al array
 eliminarTarjeta(item:any,index:number){
if(item.tipo==this.infante){
    this.sala.splice(index, 1);
    this.infantes_sin_asignar.unshift(item);

}else if(item.tipo==this.maestra){
    this.sala.splice(index, 1);
    
    this.maestras_sin_asignar.unshift(item);
    
}


this.valida_boton=this.validarMaestra();


 }
 setearColor(color:string){
     this.colorSala=color;
 }
 enviar(){
  this.mostrarAlert=false;
  
     let ids= this.procesarSala();
     console.log(ids[0]);
     console.log(ids[1]);
     console.log(ids[2]);
     console.log(ids[3]);
     if(!ids[0] && !ids[0] && !ids[1] && !ids[2]){
       console.log('no hubo cambios');
       this.mostrarAlert=true;
       return;

     }else{
      if(!ids[0]){
        ids[0]=this.maestra_sala.id;
      }
      
      this.databseService.updateSala(ids[1],ids[2],ids[0],this.id_sala,ids[3]).subscribe(data=>{
        console.log(data);
        if(!data.error){





          this.databseService.sinAsignar().subscribe(data=>{
            console.log(data);
            this.infantes_sin_asignar=[];
            this.maestras_sin_asignar=[];
            this.infantes_sin_asignar=data.infantes;
            this.maestras_sin_asignar=data.maestras;
            this.databseService.traerSala(this.id_sala).subscribe(data=>{
              if(!data.error){
                this.infantes_sala=[];
                this.maestra_sala=[];
                this.sala=[];
                this.infantes_sala=data.infantes;
                this.maestra_sala=data.maestra;
      
                this.infantes_sala.forEach(element => {
                  element.tipo=this.infante;
                  this.sala.push(element);
                  
                });
                this.maestra_sala.tipo=this.maestra;
                this.sala.unshift(this.maestra_sala);
                console.log('asignacion');
      
              }
      
      
              })
        },error=>{
            console.log(error);
        })
      
            


        }
      },error=>{
        console.log(error);
      })
     }
   
     
     
     
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


procesarSala():string[]{
  console.log(JSON.stringify(this.sala_original));

  let id_maestra;
  let ids_eliminar:string;
  let ids_infantes:string;
  let cambio_maestra:string='no';
  
  for(let nueva of this.sala ){

    let nuevo:boolean=true;
    
      // ids_infantes = (ids_infantes ? ids_infantes+','+nueva.id : nueva.id);
        if(nueva.tipo===this.infante){
          
        
         for (let original of this.infantes_sala) {
          
              if(original.tipo==this.infante && nueva.id === original.id){
                
                  nuevo=false;
                  console.log('false');
                  
                  break;
              }
         }
   
   
            if(nuevo){
              console.log('nuevo', nueva.id)
              ids_infantes = (ids_infantes ? ids_infantes+','+nueva.id : nueva.id);
            }
      }else if (nueva.tipo=== this.maestra  && nueva.id ===this.maestra_sala.id){
        
      }else{
     id_maestra=nueva.id;        
     cambio_maestra='si';
      }
    }
    ids_infantes;

    for(let infante of this.infantes_sala){
      let esta:boolean= false;
            for(let infante_sala of this.sala){
              if(infante.id === infante_sala.id && infante_sala.tipo ===this.infante){
                    esta=true;

              }
            }
            if(!esta){
              
              ids_eliminar= (ids_eliminar ? ids_eliminar+','+infante.id : infante.id);
              
            }


    }
    console.log('infantes a eliminar',ids_eliminar);
    console.log('infantes nuevos',ids_infantes);
    console.log('maestra', id_maestra);

    let respuesta:any[]=[];
    respuesta.push(id_maestra);
    respuesta.push(ids_infantes);
    respuesta.push(ids_eliminar);
    respuesta.push(cambio_maestra);
    return respuesta;
    

  }


 //valida si hay una maestra ya en la sala




}

    
   
