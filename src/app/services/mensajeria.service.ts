import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class MensajeriaService {
 private  missions = ['Fly to the moon!',
  'Fly to mars!',
  'Fly to Vegas!'];
 
 
  
public mensaje:string='';
  constructor() {
    
   }

   private subject = new Subject<any>();
   private notify = new Subject<any>();
   
    //   sendMessage(message: string) {
    //       this.subject.next({ text: message });
    //   }

    // payload.data.remitente,payload.data.fecha,payload.data.cuerpo
      sendMessage(remitente: string,fecha:string,cuerpo:string,id:string) {
          console.log(remitente);
          this.subject.next({ correo: remitente,
                                 fecha:fecha,
                                  cuerpo:cuerpo,
                                  id:id           
                                 });
      }
      nuevaNotificacion(notificaion:string) {
        console.log(notificaion);
        this.notify.next({ notificaion: notificaion
                                      
                               });
    }

   
      clearMessage() {
          this.subject.next();
          this.notify.next();
      }
   
      getMessage(): Observable<any> {
          return this.subject.asObservable();
      }
      getNotify():Observable<any>{
        return this.notify.asObservable();
        
      }
      
}
