import { Subject } from 'rxjs/Subject';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Constantes } from 'app/clases/constantes';
import { BaseDatosService } from './../../services/base-datos.service';
import { MensajeriaService } from './../../services/mensajeria.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import "rxjs/add/operator/debounceTime";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import { debounceTime } from 'rxjs/operator/debounceTime';


@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
  
})
export class MensajeComponent implements OnInit {
  valid_boton=false;
  message: any[]=[];
  correo_destinatarios:string="";

  //variables del mensaje de error
  private _success = new Subject<string>();
    staticAlertClosed = false;
    successMessage: string;
      subscription: Subscription;
 
  // history :string[]=[];
  //array para manejar las conversaciones
  conversaciones:any[]=[];
  //conversacion que esta seleccionada
  id_conversacion:string="";
  //guarda los chats
  chat:any[]=[];
  //correo del usuario vigente
  correo:string;
  //tipo del usuario vigente
  tipo:string;
  //campo de texto a enviar
  respuesta:string="";

  indice_chat=0;

  tab: number = 1;//maneja el modulo que se muestra conversaciones | nuevo | archivado

//variables nueva conversacion
remitentes_db:any[]=[];//remitentes que trae el webservice
destinatarios:any[]=[];//remitentes que selecciona el usuario
asunto:string="";//asunto del buevo mensaje



//

Forma:FormGroup;


constructor(private missionService: MensajeriaService,
   private database_service: BaseDatosService) {
    this.Forma = new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)])
    });


  this.subscription = this.missionService.getMessage().subscribe(message => {
    console.log(message.correo);
    let index=0;
    let chat:any;
     this.database_service.traer_mensajes(this.correo).subscribe(data => {
      console.log(data);
      this.conversaciones = data.mensajes;
      for(let conversacion of this.conversaciones){
        
             
              if(conversacion.id_conversacion === this.id_conversacion){
             this.chat= conversacion.mensajes;
              
              }
               index++;
            }


    }, error => {
      console.error(error);
    })
   


   
  });

  //typehead
  



}

//se lanza el evento cuando se selecciona el contacto de la lista
public onSelectTypeahead(eventItem: any) {
   console.log( 'event',eventItem);
   for(let destino of this.destinatarios){
         if (destino.correo == eventItem.correo){
          setTimeout (() => {
            this.Forma.controls['nombre'].reset();
            
          }, 500)
          
           return
           
         }
         
   }
   this.destinatarios.push(eventItem);
   setTimeout (() => {
    console.log(this.destinatarios);
    this.Forma.controls['nombre'].reset();
    
  }, 500)
   


   }



search = (text$: Observable<string>) =>
text$
  .debounceTime(200)
  .map(term => term === '' ? []
    :this.remitentes_db.filter(v => v.nombre_completo.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

formatter = (x: {nombre_completo: string}) => x.nombre_completo;


    //maneja las variables para mostrar las distintas pestañas
    setTab(num: number) {
      this.respuesta="";
      this.tab = num;
      
      if(num == 2){
        //si la pestaña es 2
        this.remitentes_db=[];
        
        //vacio el chat
        this.chat=[];
        //busco destinatarios
      this.database_service.buscarDestinatario(this.correo,this.tipo).subscribe(data=>{
        console.log('data',data);
        if(this.tipo=='3')
       {
       this.remitentes_db=data.directivos;
       this.remitentes_db.push(data.maestra);
      }
      else if(this.tipo=='1'){
        this.remitentes_db.push(...data.maestra);
        this.remitentes_db.push(...data.padres);
        
        
      }else if (this.tipo=='2'){
        if(data.padres)
       { 
        this.remitentes_db.push(...data.directivos);
        this.remitentes_db.push(...data.padres);
      }else{
        this.remitentes_db=data.directivos;
        

      }
      }
      },error=>{
        console.log('error');
      })
    }
     if(num == 1){
       if(!this.conversaciones){
         return;
       }
       //si la pestaña es 1 
       for(let conversacion of this.conversaciones){
        
             
              if(conversacion.id_conversacion === this.id_conversacion){
             this.chat= conversacion.mensajes;
              return
              }
            }
     }
    }
  
    isSelected(num: number) {
      return this.tab === num;
    }


  ngOnInit() {
    

   this.correo= localStorage.getItem('correo');
   this.tipo= localStorage.getItem('tipo');
   

    this.database_service.traer_mensajes(this.correo).subscribe(data=>{
        console.log(data);
      this.conversaciones=  data.mensajes;
    },error=>{
      console.error(error);
    })

    
    this._success.subscribe((message) => this.successMessage = message);
    debounceTime.call(this._success, 9000).subscribe(() => this.successMessage = null);
    
  }
 
  seleccionChat(i:number){
      this.id_conversacion= this.conversaciones[i].id_conversacion;
    this.indice_chat=i;
    this.chat = this.conversaciones[i].mensajes;

  }
  public changeSuccessMessage(message) {
    this._success.next(message);
  }


  responderMensaje(){
  
     
  
    
    
    let fecha= Constantes.getFechaHora();
    this.Forma.controls['nombre'].reset();
    //si la pestaña es 1 controlo los campos
      if(this.tab==1){
        if(this.id_conversacion.length <1 || this.respuesta.length<1){
          this.changeSuccessMessage('error');
          return;
        }
        
      }
        //si la pestaña es 1 controlo los campos

    if(this.tab == 2){

      if(this.destinatarios.length<1 || this.asunto.length<1 || this.respuesta.length <1){
        this.changeSuccessMessage('error');
        return;
      }
       for( let aux of this.destinatarios){
         this.correo_destinatarios=this.correo_destinatarios.length<1?aux.correo:this.correo_destinatarios+","+aux.correo;
       }
      
      console.log(this.correo_destinatarios);
      this.database_service.nuevoMensaje(this.correo,this.correo_destinatarios,fecha,this.asunto,this.respuesta).subscribe(data=>{
        console.log(data);
        if(!data.error){
          this.tab=1;

    this.database_service.traer_mensajes(this.correo).subscribe(data=>{
      console.log(data);
    this.conversaciones=  data.mensajes;
    this.chat=[];
    this.destinatarios=[];
    this.respuesta='';
    this.asunto='';
  },error=>{
    console.error(error);
  })
          

        }
      },error=>{
        console.log(error);
      })
      return;

    }

    // pestaña conversaciones
      let correo_aux:string;
    //busco el correo diferente al del usuario logueado
      if(this.chat[0].correo_destino !=this.correo){
      correo_aux=this.chat[0].correo_destino ;
      }else{
        correo_aux=this.chat[0].correo_origen;
        
      }
    console.log(correo_aux);
    
    
  
        this.database_service.respuestaMensaje(this.chat[0].id_dialogo,this.correo,correo_aux,this.respuesta,fecha).subscribe(data=>{
          console.log('respuesta',data);
          if(!data.error){
              //si no hay error traigo los mensajes
              this.respuesta="";
              this.database_service.traer_mensajes(this.correo).subscribe(data=>{
                console.log(data);
              this.conversaciones=  data.mensajes;
              for(let conversacion of this.conversaciones){
                
                     
                      if(conversacion.id_conversacion === this.id_conversacion){
                     this.chat= conversacion.mensajes;
                      
                      }
                    }




            },error=>{
              console.error(error);
            })



          }

        },error=>console.log(error))


  }


     ngOnDestroy() {
            // unsubscribe to ensure no memory leaks
            this.subscription.unsubscribe();
        }


    //elimina un destinatario
    eliminarDestinatario(index:number){
      this.destinatarios.splice(index,1);

    }





}
