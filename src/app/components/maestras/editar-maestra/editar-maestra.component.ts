import { Maestra } from 'app/clases/maestras';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { Maestra } from './../../../clases/maestras';
import { BaseDatosService } from 'app/services/base-datos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Constantes } from 'app/clases/constantes';

@Component({
  selector: 'app-editar-maestra',
  templateUrl: './editar-maestra.component.html',
  styleUrls: ['./editar-maestra.component.css']
})
export class EditarMaestraComponent implements OnInit {
  maestra:Maestra;
  id_maestra:string;
  FormMaestra:FormGroup;
  public es= Constantes.CALENDAR;
  datos_maestra:any;
  seteo:boolean=false;
  

  constructor(private route: ActivatedRoute, private databaseService:BaseDatosService,private router:Router) { 
    this.maestra= new Maestra();
    this.FormMaestra= new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido': new FormControl('', Validators.required),
      'correo': new FormControl('',[]),
      'fecha_na': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'DNI': new FormControl('', Validators.required),
      'pin_tablet': new FormControl('', Validators.required),
      
      'telefono': new FormControl('', Validators.required)
    });

    this.FormMaestra.valueChanges.subscribe(data => {
      
            console.log('Form changes', data);
            if (this.FormMaestra.valid ) {
              console.log('Form changes', data);
              
              this.maestra.nombre = this.datos_maestra.nombre;
              this.maestra.apellido = this.datos_maestra.apellido;
              this.maestra.correo = this.datos_maestra.correo;
              this.maestra.documento = data.DNI;
              this.maestra.fecha_nacimineto = data.fecha_na;
              this.maestra.direccion = data.direccion;
              this.maestra.telefono = data.telefono;
              this.maestra.pin_tablet=data.pin;
            }
          });
   
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
       //obtengo el parametro del id
         this.id_maestra = params['id'];
         this.maestra.id=this.id_maestra;
         console.log(this.id_maestra);


    // 
    this.databaseService.buscarMaestraId(this.id_maestra).subscribe(data=>{
      // hago la peticion
    //  let fecha= data.maestra.fecha_na.split("-"); 
    //  let fechaPadre= data.padres[0].fecha_na.split("-"); 
     
     console.log(data);
     this.datos_maestra=data.maestra;
    //  lleno el formulario con los datos del infante
      let fecha= data.maestra.fecha_na.split("-"); 
    
      this.FormMaestra.controls['nombre'].setValue(data.maestra.nombre);
      this.FormMaestra.controls['nombre'].disable();
      
      this.FormMaestra.controls['apellido'].setValue(data.maestra.apellido);
      this.FormMaestra.controls['apellido'].disable();
      
      this.FormMaestra.controls['direccion'].setValue(data.maestra.direccion);
      this.FormMaestra.controls['DNI'].setValue(data.maestra.DNI);
      this.FormMaestra.controls['correo'].setValue(data.maestra.correo);
      this.FormMaestra.controls['correo'].disable();
      this.FormMaestra.controls['pin_tablet'].setValue(data.maestra.pin_tablet);
      
      this.FormMaestra.controls['telefono'].setValue(data.maestra.telefono);
      this.FormMaestra.controls['fecha_na'].setValue( fecha[2]+'/'+fecha[1]+"/"+fecha[0]);
      this.seteo=true;
 
     },error=>{
       console.log(error);
     })
    // 


  });

}

onSubmitMaestra(){
  this.databaseService.updateMaestra(this.maestra).subscribe(data=>{
    console.log(data);
    if(!data.error){
      this.router.navigate(['/buscar_maestra'])
    }
  },error=>{
    console.log(error);
  })

}

}
