import { Persona } from './../../../clases/persona';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseDatosService } from "app/services/base-datos.service";

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {
  public page: number = 1;// número de pagina donde se encuentra el usuario/
  // puede ser alta infante o alta tutor 

  //array de personas infante padre , padre                    
  public personas: Array<Persona>;

padre1:Persona;
padres2:Persona;
infante:Persona;
  public complete: boolean = false;


  infanteValido: boolean = false;
  padre1Valido: boolean = false;
  padre2Valido: boolean = false;
  segundoPAdre: boolean = false;
  guardarValido: boolean = false;



  constructor(private servicioBD:BaseDatosService) {
    this.padre1=new Persona();
    this.padres2= new Persona();
    this.infante= new Persona();
  


  }

  ngOnInit() {
    this.page = 1;
  }
  agregarTutor() {
    this.page = this.page + 1;
    console.log(this.page);

  }

  /*
se lanza está funcion cuando el formulario de infantes esta completo
, recibe el infante 
*/

  catchInfanteComplete(user) {
    this.infante.nombre = user.nombre;
    this.infante.apellido = user.apellido;
    this.infante.correo = user.correo;
    this.infante.documento = user.documento;
    this.infante.fecha_nacimineto = user.fecha;
    this.infante.direccion = user.direccion;
    this.infante.telefono = user.telefono;
    this.infante.imagen=user.imagen;
    this.infante.tipo = 'padre';
    console.log('callback infante complete', user);
    this.infanteValido = true;
    this.guardarValido = this.validarBotonGuardar();


  }

  catchPadreComplete(user) {
    this.padre1.nombre = user.nombre;
    this.padre1.apellido = user.apellido;
    this.padre1.correo = user.correo;
    this.padre1.documento = user.documento;
    this.padre1.fecha_nacimineto = user.fecha;
    this.padre1.direccion = user.direccion;
    this.padre1.telefono = user.telefono;
    this.padre1.tipo = 'padre';
    console.log('callback padre complete');
    this.padre1Valido = true;
    this.guardarValido = this.validarBotonGuardar();


  }
  catchSecondTutorComplete(user) {
    this.padres2.nombre = user.nombre2;
    this.padres2.apellido = user.apellido2;
    this.padres2.correo = user.correo2;
    this.padres2.documento = user.documento2;
    this.padres2.fecha_nacimineto = user.fecha2;
    this.padres2.direccion = user.direccion2;
    this.padres2.telefono = user.telefono2;
    this.padres2.tipo = 'padre';
    console.log('callback segundo padre', user);

    this.padre2Valido = true;
    this.guardarValido = this.validarBotonGuardar();

  }
  obtenerFOrmularioInvalido(data: any) {
    if (data.padre === 'padre1') {
      this.padre1Valido = false;
      this.guardarValido = this.validarBotonGuardar();

    }
    else {
      this.padre2Valido = false;
      this.guardarValido = this.validarBotonGuardar();

    }

  }

  catchButtonFalse(data) {
    // recibe eventos de si poner o no el boton de guardar  en true
    console.log('btn false', data);
    this.segundoPAdre = !data;
    this.guardarValido = this.validarBotonGuardar();
  }
  volverInfante() {
    this.page = this.page - 1;
  }
  validarBotonGuardar(): boolean {
    console.log(this.infanteValido, this.padre1Valido, this.padre2Valido, this.segundoPAdre)
    if (this.padre1Valido && this.padre2Valido && this.infanteValido && this.segundoPAdre) {
      return true;
    } else if (this.padre1Valido && !this.padre2Valido && this.infanteValido && !this.segundoPAdre) {
      return true;

    } else if (this.padre1Valido && this.padre2Valido && this.infanteValido && !this.segundoPAdre) {
      return true;

    }

    else {
      return false;
    }

  }

  enviarDatos(){
console.log('enviar datos',this.padre1,this.padres2,this.infante);
 this.servicioBD.SendUsuario( this.padre1,this.padres2,this.infante,"asdassd").subscribe(data=>{
console.log('respuesta',data)
 },error=>{
   console.log('error',error);
 }
);
  }





}
