import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actividad'
})
export class ActividadPipe implements PipeTransform {

  transform(actividad:any,rol:string): string {
  
     //descanso inicio
     if( ( actividad.actividad==="descanso") && (actividad.cantidad =='INICIO') && (rol=='titulo')){
      
      
            return 'Descansando';
      
          } else if( ( actividad.actividad==="descanso") && (actividad.cantidad =='INICIO') && (rol=='sub')){
            
            
                  return 'se ah dromido';
            
          }
          else if( ( actividad.actividad==="descanso") && (actividad.cantidad =='INICIO') && (rol=='foto')){
            
            
                  return 'assets/sleep.svg';
            
          }
    
    //descanso final
    if( ( actividad.actividad==="descanso") && (actividad.cantidad !='INICIO') && (rol=='titulo')){


      return 'Final de descanso';

    } else if( ( actividad.actividad==="descanso") && (actividad.cantidad !='INICIO') && (rol=='sub')){
      
      
            return 'ah dormido ' + actividad.cantidad +' hs' ;
      
    }
    else if( ( actividad.actividad==="descanso") && (actividad.cantidad !='INICIO') && (rol=='foto')){
      
      
            return 'assets/despierto.png';
      
    }
    //alimentación desayuno
    if( ( actividad.actividad==="desayuno")  && (rol=='titulo')){
      
      
            return 'Desayuno';
      
          } else if( ( actividad.actividad==="desayuno")  && (rol=='sub')){
            
            
                  return 'ah desayunado ' + actividad.cantidad;
            
          }
          else if( ( actividad.actividad==="desayuno")  && (rol=='foto')){
            
            
                  return 'assets/biberon.png';
            
          }

            //alimentación almuerzo
    if( ( actividad.actividad==="almuerzo")  && (rol=='titulo')){
      
      
            return 'Almuerzo';
      
          } else if( ( actividad.actividad==="almuerzo")  && (rol=='sub')){
            
            
                  return 'ah almorzado ' + actividad.cantidad;
            
          }
          else if( ( actividad.actividad==="almuerzo")  && (rol=='foto')){
            
            
                  return 'assets/almuerzo.png';
            
          }

          //merienda
          if( ( actividad.actividad==="merienda")  && (rol=='titulo')){
            
            
                  return 'Merienda';
            
                } else if( ( actividad.actividad==="merienda")  && (rol=='sub')){
                  
                  
                        return 'ah merendado ' + actividad.cantidad;
                  
                }
                else if( ( actividad.actividad==="merienda")  && (rol=='foto')){
                  
                  
                        return 'assets/biberon.png';
                  
                }

                          //pis
          if( ( actividad.actividad==="pis")  && (rol=='titulo')){
            
            
                  return 'Cambio de pañal';
            
                } else if( ( actividad.actividad==="pis")  && (rol=='sub')){
                  
                  
                        return ' se ah hecho  pis ';
                  
                }
                else if( ( actividad.actividad==="pis")  && (rol=='foto')){
                  
                  
                        return 'assets/panal.png';
                  
                }
                
                          //caca
          if( ( actividad.actividad==="caca")  && (rol=='titulo')){
            
            
                  return 'Cambio de pañal';
            
                } else if( ( actividad.actividad==="caca")  && (rol=='sub')){
                  
                  
                        return '  ah hecho  caca '+ actividad.cantidad ;
                  
                }
                else if( ( actividad.actividad==="caca")  && (rol=='foto')){
                  
                  
                        return 'assets/panal.png';
                  
                }
                                   //especial
          if( ( actividad.actividad==="especial")  && (rol=='titulo')){
            
            
                  return 'Por facvor Pongase en contacto con el Jardín';
            
                } else if( ( actividad.actividad==="especial")  && (rol=='sub')){
                  
                  
                        return actividad.cantidad ;
                  
                }
                else if( ( actividad.actividad==="especial")  && (rol=='foto')){
                  
                  
                        return 'assets/alert.png';
                  
                }
            
                 //salida
          if( ( actividad.actividad==="salida")  && (rol=='titulo')){
            
            
                  return 'Salida '+ actividad.cantidad ;
                  
                }
                else if( ( actividad.actividad==="salida")  && (rol=='sub')){
                  
                  
                        return ' ha sido retirada del jardín';
                  
                }
                else if( ( actividad.actividad==="salida")  && (rol=='foto')){
                  
                  
                        return 'assets/salida.png';
                  
                }
                       //salida
          if( ( actividad.actividad==="ingreso")  && (rol=='titulo')){
            
            
                  return 'Ingreso';
                  
                }
                else if( ( actividad.actividad==="ingreso")  && (rol=='sub')){
                  
                  
                        return ' ha ingresado al jardín';
                  
                }
                else if( ( actividad.actividad==="ingreso")  && (rol=='foto')){
                  
                  
                        return 'assets/entrada.png';
                  
                }
    
  
        
        
        

  }
}
