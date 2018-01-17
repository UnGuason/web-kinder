import { Maestra } from 'app/clases/maestras';
import { Injectable } from '@angular/core';
import { Persona } from "app/clases/persona";
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";


import 'rxjs/add/operator/map';
import { Constantes } from 'app/clases/constantes';


@Injectable()
export class BaseDatosService {

  constructor(private http?:Http) { }



  public SendUsuario(padre1:Persona,padre2:Persona,infante:Persona, $uid: string) {
    let body = new FormData();
    let fecha1= Constantes.getHora(infante.fecha_nacimineto);
    let fecha2= Constantes.getHora(padre1.fecha_nacimineto);
    
    //parametros del infante
    body.append('nombre', infante.nombre);
    body.append('apellido', infante.apellido);
    body.append('dni', infante.documento);
    body.append('fecha_na', fecha1);
    body.append('direccion', infante.direccion);
    body.append('telefono',infante.telefono);
    body.append('foto',infante.imagen);
    //parametros del padre 1 
    body.append('nombrep1', padre1.nombre);
    body.append('apellidop1',padre1.apellido);
    body.append('dnip1', padre1.documento);
    body.append('fecha_nap1', fecha2);
    body.append('direccionp1', padre1.direccion);
    body.append('telefonop1', padre1.telefono);
    body.append('correop1', padre1.correo);
    if(padre2){
      let fecha3= Constantes.getHora(padre2.fecha_nacimineto);
      
    body.append('nombrep2', padre2.nombre);
    body.append('apellidop2',padre2.apellido);
    body.append('dnip2', padre2.documento);
    body.append('fecha_nap2',fecha3);
    body.append('direccionp2', padre2.direccion);
    body.append('telefonop2', padre2.telefono);
    body.append('correop2', padre2.correo);
    }
    



    var link ="https://virtualkinder.com/rest/index.php/infantes/alta";
    let headers = new Headers({
      'Content-Type': 'aplicattion/json'
    });
    return this.http.post  (link, body).map(res => {
      return res.json();
    });

  }
  //envia un padre solo para agregar un padre cuando el infante tiene uno solo
  sendPadre(padre:Persona, id:string){
    let body = new FormData();
    let fecha1= Constantes.getHora(padre.fecha_nacimineto);
      //parametros del padre 
      body.append('nombrep1', padre.nombre);
      body.append('apellidop1',padre.apellido);
      body.append('dnip1', padre.documento);
      body.append('fecha_nap1', fecha1);
      body.append('direccionp1', padre.direccion);
      body.append('telefonop1', padre.telefono);
      body.append('correop1', padre.correo);
      var link ="https://virtualkinder.com/rest/index.php/infantes/alta_padre/"+id;
      console.log(link);
      
      let headers = new Headers({
        'Content-Type': 'aplicattion/json'
      });
      return this.http.post  (link, body).map(res => {
        return res.json();
      });

  }
  //actualiza los datos de un infante
 updateInfante(infante:Persona){
  let fecha1= Constantes.getHora(infante.fecha_nacimineto);
  console.log(fecha1);
  let body = new FormData();
    //parametros del infante
    body.append('id', infante.id);    
    body.append('nombre', infante.nombre);
    body.append('apellido', infante.apellido);
    body.append('dni', infante.documento);
    body.append('fecha_na', fecha1);
    body.append('direccion', infante.direccion);
    body.append('telefono',infante.telefono);
    body.append('foto',infante.imagen);
    var link ="https://virtualkinder.com/rest/index.php/infantes/editar_infante";
    let headers = new Headers({
      'Content-Type': 'aplicattion/json'
    });
    return this.http.post  (link, body).map(res => {
      console.log(res);
      return res.json();
    });
   
   }
  //actualiza los datos del padre
updatePadre(padre:Persona){
    let fecha1= Constantes.getHora(padre.fecha_nacimineto);
    let body = new FormData();
      //parametros del infante
      body.append('idp1', padre.id); 
      body.append('nombrep1', padre.nombre);
      body.append('apellidop1',padre.apellido);
      body.append('dnip1', padre.documento);
      body.append('fecha_nap1', fecha1);
      body.append('direccionp1', padre.direccion);
      body.append('telefonop1', padre.telefono);
      body.append('correop1', padre.correo);
      
      var link ="https://virtualkinder.com/rest/index.php/infantes/editar_padre";
      let headers = new Headers({
        'Content-Type': 'aplicattion/json'
      });
      return this.http.post  (link, body).map(res => {
        console.log(res);
        return res.json();
      });
     
    }
  
  public SendToken(token:string,correo) {
    let body = new FormData();
    body.append('texto',token);
    body.append('correo', correo);

    
    
    var link ="https://virtualkinder.com/rest/index.php/tokens/alta";
    let headers = new Headers({
      'Content-Type': 'aplicattion/json'
    });
    return this.http.post  (link, body).map(res => {
      return res.json();
    });

  }
  // valida los permisos del usuario
  public ValidarPermisos(profile,proveedor) {
  let foto=(proveedor=='google')? profile.picture:profile.picture.data.url;
     localStorage.setItem('foto',foto);
    let body = new FormData();
    body.append('correo', profile.email);
    body.append('foto',foto);
    body.append('id',profile.id);
    body.append('proveedor',proveedor);
    
    
    var link ="https://virtualkinder.com/rest/index.php/tokens/validar_permisos";
    let headers = new Headers({
      'Content-Type': 'aplicattion/json'
    });
    return this.http.post  (link, body).map(res => {
      console.log(res);
      return res.json();
    });

  }
  //busca infantes y maestras sin asignar
  public  sinAsignar() {
    
        var link = "https://virtualkinder.com/rest/index.php/infantes/listar_sin_asignar";
        return this.http.get(link).map(resp => {
          return resp.json();
        });
    
    
   }
   //busca el nombre de la sala
   public validarNombreSala(nombre:string) {
    
console.log(nombre);
    
    var link = "https://virtualkinder.com/rest/index.php/infante/validar_sala/"+nombre;
    return this.http.get(link).map(resp => {
      return resp.json();
    });
    
    
   }

   //lista todas las salas
   public ListarSala(){
    
    
    var link =  "https://virtualkinder.com/rest/index.php/salas/listar_numerico";
    return this.http.get(link).map(resp => {
      return resp.json();
    });
    
    
   }
     //lista todas las salas
     public listaPadres(id:string){
      
      
      var link =  "https://virtualkinder.com/rest/index.php/infantes/listar_padres/"+id;
      return this.http.get(link).map(resp => {
        return resp.json();
      });
      
      
     }
  public buscarInfante(uid: string, paginacion: string, infante: string) {

    var link = Constantes.BASE_URL + '/infante/' + uid + '/' + paginacion + '/' + infante;
    return this.http.get(link).map(resp => {
      return resp.json();
    });


  }
  //busca un infante por id
  public buscarId(id: string) {

    var link = Constantes.BASE_URL + '/infante/buscar_id/' + id;
    return this.http.get(link).map(resp => {
      return resp.json();
    });


  }

    //envia los datos de un maestro para darlo de alta
    sendMaestra(maestra:Persona,pinTablet:string){
      let body = new FormData();

      let fecha= Constantes.getHora(maestra.fecha_nacimineto);
        //parametros del padre 
        body.append('nombre', maestra.nombre);
        body.append('apellido',maestra.apellido);
        body.append('dni', maestra.documento);
        body.append('fecha_na', fecha);
        body.append('direccion', maestra.direccion);
        body.append('telefono', maestra.telefono);
        body.append('correo', maestra.correo);
        body.append('pin_tablet',pinTablet);
        
        var link ="https://virtualkinder.com/rest/index.php/maestras/alta";
        console.log(link);
        
        let headers = new Headers({
          'Content-Type': 'aplicattion/json'
        });
        return this.http.post  (link, body).map(res => {
          return res.json();
        });
  
    }
    //trae todas las maestras
    public traerMaestras() {
      
          var link = "https://virtualkinder.com/rest/index.php/maestras/listar";
          return this.http.get(link).map(resp => {
            return resp.json();
          });
      
      
     }
     //busca una maestra por id
     public buscarMaestraId(id: string) {
      let body = new FormData();
      
              body.append('id', id);
      
              var link = "https://virtualkinder.com/rest/index.php/maestras/buscar";
              return this.http.post(link,body).map(resp => {
            return resp.json();
          });
      
      
        }

        //actualiza una maestra
        updateMaestra(maestra:Maestra){
          let fecha1= Constantes.getHora(maestra.fecha_nacimineto);
          let body = new FormData();
            //parametros del infante
            body.append('id', maestra.id); 
            body.append('nombre', maestra.nombre);
            body.append('apellido',maestra.apellido);
            body.append('dni', maestra.documento);
            body.append('fecha_na', fecha1);
            body.append('direccion', maestra.direccion);
            body.append('telefono', maestra.telefono);
            body.append('pin_tablet', maestra.pin_tablet);
            
            
            var link ="https://virtualkinder.com/rest/index.php/maestras/editar_maestra";
            let headers = new Headers({
              'Content-Type': 'aplicattion/json'
            });
            return this.http.post (link, body).map(res => {
              console.log(res);
              return res.json();
            });
           
          }
          //funcion para isnertar una sala
          insertaSala(nombre:string,capacidad:string,edad:string,color:string,infantes:string,maestra:string){
   
            let body = new FormData();
              //parametros del infante
              body.append('nombre', nombre);
              body.append('capacidad', capacidad);
              body.append('edad', edad);
              body.append('color', color);
              body.append('maestra', maestra);
              body.append('infantes', infantes);
              console.log(infantes);
              
              
              
              var link ="https://virtualkinder.com/rest/index.php/salas/alta1";
              let headers = new Headers({
                'Content-Type': 'aplicattion/json'
              });
              return this.http.post  (link, body).map(res => {
                console.log(res);
                return res.json();
              });
             
             }

             //traer llos infantes ,maestras y datos de una sala
             public traerSala(id_sala:string) {
              
              var link = "https://virtualkinder.com/rest/index.php/infantes/listar_sala/"+id_sala;
              return this.http.get(link).map(resp => {
                    return resp.json();
                  });
              
              
             }


               //actualiza los datos de un infante
 updateSala(infantes_nuevos:string,infantes_eliminar:string,maestra:string,id_sala:string,cambio_maestra:string){
  //     if (!isset($data['maestra']) OR !isset($data['eliminar']) OR !isset($data['nuevos']) OR !isset($data['id_sala'])){
  let body = new FormData();
    //parametros del infante
    body.append('maestra', maestra);    
    body.append('eliminar',infantes_eliminar);
    body.append('nuevos', infantes_nuevos);
    body.append('id_sala', id_sala);
    body.append('cambio', cambio_maestra);
    

    var link =" https://virtualkinder.com/rest/index.php/salas/editar_sala";
    let headers = new Headers({
      'Content-Type': 'aplicattion/json'
    });
    return this.http.post  (link, body).map(res => {
      console.log(res);
      return res.json();
    });
   
   }

             //traer llos infantes ,maestras y datos de una sala
  public traer_mensajes (correo:string) {
              
    let body = new FormData();
    //parametros del infante
    body.append('correo', correo);    
  
    

    var link ="  https://virtualkinder.com/rest/index.php/mensajes/buscar_usuario/";
    let headers = new Headers({
      'Content-Type': 'aplicattion/json'
    });
    return this.http.post  (link, body).map(res => {
      console.log(res);
      return res.json();
    });
              
              
    }
/*
'id'=>'', 'id_dialogo' =>$data['id_dialogo'], 'correo_origen' =>$data['correo_origen'],
                        'correo_destino'=>$data['correo_destino'], 'cuerpo'=>$data['cuerpo'],'fecha'=>$data['fecha'],
                         'control'=>$control);
*/

      // nuevo mensaje
      nuevoMensaje(correo_origen:string,correo_destino:string,fecha:string,asunto:string,cuerpo:string){
        // if (!isset($data['correo_origen']) OR !isset($data['fecha'])
        // OR !isset($data['correo_destino']) OR !isset($data['cuerpo'])
        // OR !isset($data['asunto']))
        let body = new FormData();
        //parametros del infante
        body.append('correo_origen', correo_origen);    
        body.append('correo_destino', correo_destino);
        body.append('cuerpo', cuerpo);
        body.append('fecha', fecha);
        body.append('asunto', asunto);
        var link ="  https://virtualkinder.com/rest/index.php/mensajes/alta/";
        let headers = new Headers({
          'Content-Type': 'aplicattion/json'
        });
        return this.http.post  (link, body).map(res => {
          console.log(res);
          return res.json();
        });

      }
     //respuesta a un mensaje
    respuestaMensaje(id_dialogo:string,correo_origen:string,correo_destino:string,cuerpo:string,fecha:string){
      //     if (!isset($data['maestra']) OR !isset($data['eliminar']) OR !isset($data['nuevos']) OR !isset($data['id_sala'])){
      let body = new FormData();
        //parametros del infante
        body.append('id_dialogo', id_dialogo);    
        body.append('correo_origen',correo_origen);
        body.append('correo_destino', correo_destino);
        body.append('cuerpo', cuerpo);
        body.append('fecha', fecha);
        
    
        var link ="  https://virtualkinder.com/rest/index.php/mensajes/respuesta/";
        let headers = new Headers({
          'Content-Type': 'aplicattion/json'
        });
        return this.http.post  (link, body).map(res => {
          console.log(res);
          return res.json();
        });
       
       }

       //recibir notificaciones para el padre
       traerNotificaciones(correo:string,fecha:string){
        //     if (!isset($data['maestra']) OR !isset($data['eliminar']) OR !isset($data['nuevos']) OR !isset($data['id_sala'])){
           let body = new FormData();
          //parametros del infante
          body.append('correo', correo);    
      
          
      
          var link ="https://virtualkinder.com/rest/index.php/actividadgon/listar_padre/"+fecha;
          let headers = new Headers({
            'Content-Type': 'aplicattion/json'
          });
          return this.http.post  (link, body).map(res => {
            console.log(res);
            return res.json();
          });
         
         }


         //buscar infante por parametro
         buscarPorParametro(texto:string){
          let body = new FormData();
          //parametros del infante
          body.append('texto', texto);
          var link ="https://virtualkinder.com/rest/index.php/infantes/buscar_nombre/";
          let headers = new Headers({
            'Content-Type': 'aplicattion/json'
          });
          return this.http.post  (link, body).map(res => {
            console.log(res);
            return res.json();
          });


         }


         buscarMaestraPorParametro(texto:string){
          let body = new FormData();
          //parametros del infante
          body.append('texto', texto);
          var link ="https://virtualkinder.com/rest/index.php/maestras/buscar_nombre/";
          let headers = new Headers({
            'Content-Type': 'aplicattion/json'
          });
          return this.http.post  (link, body).map(res => {
            console.log(res);
            return res.json();
          });


         }

         


         //buscar destinatarios 
           buscarDestinatario(correo:string,tipo:string){
             
            let body = new FormData();
            body.append('correo', correo);
            
            var link ="https://virtualkinder.com/rest/index.php/mensajes/buscar_destinatarios/"+tipo;
            let headers = new Headers({
              'Content-Type': 'aplicattion/json'
            });
            return this.http.post  (link, body).map(res => {
              console.log(res);
              return res.json();
            });

           }


         search(correo: string) {
          if (correo === '') {
            return Observable.of([]);
          }

          let body = new FormData();
          //parametros del infante
          body.append('texto', correo);
          var link ="https://virtualkinder.com/rest/index.php/infantes/buscar_nombre/";
          let headers = new Headers({
            'Content-Type': 'aplicattion/json'
          });
          return this.http.post  (link, body).map(res => {
            
            return res.json();
          });
      
    
        }

    
   
    




}

