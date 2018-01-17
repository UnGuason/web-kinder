import { Router } from '@angular/router';
import { BaseDatosService } from './../../../services/base-datos.service';
import { Persona } from './../../../clases/persona';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Constantes } from 'app/clases/constantes';

@Component({
  selector: 'app-alta-maestra',
  templateUrl: './alta-maestra.component.html',
  styleUrls: ['./alta-maestra.component.css']
})
export class AltaMaestraComponent implements OnInit {
FormMaestra:FormGroup;
maestra:Persona;
public es= Constantes.CALENDAR;
public pinTablet:string;

  constructor(private databaseService:BaseDatosService,private router:Router) {
    this.maestra=new Persona();
    this.FormMaestra= new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido': new FormControl('', Validators.required),
      'correo': new FormControl('', [Validators.required]),
      'fecha_na': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'DNI': new FormControl('', Validators.required),
      'pin': new FormControl('', Validators.required),
      
      'telefono': new FormControl('', Validators.required)
    });



    this.FormMaestra.valueChanges.subscribe(data => {
      
            console.log('Form changes', data);
            if (this.FormMaestra.valid ) {
              this.maestra.nombre = data.nombre;
              this.maestra.apellido = data.apellido;
              this.maestra.correo = data.correo;
              this.maestra.documento = data.DNI;
              this.maestra.fecha_nacimineto = data.fecha_na;
              this.maestra.direccion = data.direccion;
              this.maestra.telefono = data.telefono;
              this.pinTablet=data.pin;
            }
          });
   }

  ngOnInit() {
  }



  onSubmitMaestra(){
this.databaseService.sendMaestra(this.maestra,this.pinTablet).subscribe(data=>{
console.log(data);
if(!data.error){
  this.router.navigate(['/buscar_maestra']);
  
}
},error=>{
  console.log(error);
})
  }

}
