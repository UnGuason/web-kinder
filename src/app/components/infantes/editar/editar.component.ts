import { Persona } from 'app/clases/persona';
import { BaseDatosService } from 'app/services/base-datos.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constantes } from 'app/clases/constantes';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  public agregarTutor2 = false;
  public FormaPadre: FormGroup;
  public FormaPadre2: FormGroup;
 public FormaInfante: FormGroup;
 public fecha:Date;
 public es= Constantes.CALENDAR;
  uploadFile: any;
  datos_infante:any;
  datos_padres:any[];
  public upload:boolean=false;//si la imagen esta subiendo
  public succes:boolean=false;//si la imagen subio correctamenteny
  public imagen:any;
  segundoTutor:boolean=false;
  infante:Persona;
  padre1:Persona;
  padre2:Persona;
  id_infante:string;

  constructor(private route: ActivatedRoute, private databaseService:BaseDatosService,private router:Router) {
    this.padre1=new Persona();
    this.padre2= new Persona();
    this.infante= new Persona();
    


    this.FormaPadre = new FormGroup({
      'nombre1': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido1': new FormControl('', Validators.required),
      'correo1': new FormControl('', [Validators.required]),
      'fecha_na1': new FormControl('', Validators.required),
      'direccion1': new FormControl('', Validators.required),
      'DNI1': new FormControl('', Validators.required),
      'telefono1': new FormControl('', Validators.required)
  
  
  
    });
  // , Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
    this.FormaPadre2= new FormGroup({
      'nombre2': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido2': new FormControl('', Validators.required),
      'correo2': new FormControl('', [Validators.required]),
      'fecha_na2': new FormControl('', Validators.required),
      'direccion2': new FormControl('', Validators.required),
      'DNI2': new FormControl('', Validators.required),
      'telefono2': new FormControl('', Validators.required)
    });
    this.FormaInfante = new FormGroup({
      'nombre': new FormControl('',[Validators.required]),
      'apellido': new FormControl('',Validators.required),
      'fecha_na': new FormControl('', Validators.required),   
      'direccion': new FormControl('', Validators.required),   
      'DNI': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required)



    });
    this.FormaInfante.valueChanges.subscribe(data => {
      
            // console.log('Form changes', data);
            if (this.FormaInfante.valid ) {
              this.infante.nombre = data.nombre;
              this.infante.apellido = data.apellido;
              this.infante.correo = data.correo;
              this.infante.documento = data.DNI;
              this.infante.fecha_nacimineto = data.fecha_na;
              this.infante.direccion = data.direccion;
              this.infante.telefono = data.telefono;
              this.infante.imagen=this.datos_infante.foto;
              this.infante.id=this.datos_infante.id;
      
            } 
          });
          this.FormaPadre.valueChanges.subscribe(data => {
            
                  // console.log('Form changes', data);
                  if (this.FormaPadre.valid ) {
                    this.padre1.nombre = data.nombre1;
                    this.padre1.apellido = data.apellido1;
                    this.padre1.correo = data.correo1;
                    this.padre1.documento = data.DNI1;
                    this.padre1.fecha_nacimineto = data.fecha_na1;
                    this.padre1.direccion = data.direccion1;
                    this.padre1.telefono = data.telefono1;
                    this.padre1.id=this.datos_padres[0].id;
                    
                    console.log(this.padre1.correo);
            
                  } 
                });
                this.FormaPadre2.valueChanges.subscribe(data => {
                  
                        console.log('Form changes', data);
                        if (this.FormaPadre2.valid ) {
                          this.padre2.nombre = data.nombre2;
                          this.padre2.apellido = data.apellido2;
                          this.padre2.correo = data.correo2;
                          this.padre2.documento = data.DNI2;
                          this.padre2.fecha_nacimineto = data.fecha_na2;
                          this.padre2.direccion = data.direccion2;
                          this.padre2.telefono = data.telefono2;
                          if(this.segundoTutor)
                          this.padre2.id=this.datos_padres[1].id;
                  
                        } 
                      });



  }
  onSubmit(){
this.databaseService.updateInfante(this.infante).subscribe(data=>{
  console.log(data);
  this.router.navigate(['/buscar_infante']);
},error=>{
  console.log(error);
})

}
onSubmitPadre1(){
  this.databaseService.updatePadre(this.padre1).subscribe(data=>{
    this.router.navigate(['/buscar_infante']);
    
    console.log(data);
  },error=>{
    console.log(error);
  })
}
onSubmitPadre2(){
  this.databaseService.updatePadre(this.padre2).subscribe(data=>{
    console.log(data);
    this.router.navigate(['/buscar_infante']);
    
  },error=>{
    console.log(error);
  })
}
onSubmitPadreNuevo(){
  console.log('padre nuevo');
  this.databaseService.sendPadre(this.padre2,this.id_infante).subscribe(data=>{
    this.router.navigate(['/buscar_infante']);
    
    console.log(data);
  },error=>{
    console.log(error);
  })
}







  ngOnInit() {
     this.route.params.subscribe(params => {
   
    //obtengo el parametro del id
      this.id_infante = params['id'];
       this.databaseService.buscarId(this.id_infante).subscribe(data=>{
         if(data.error){
           console.error(data);
           return null;
         }
         console.log(data);

        // hago la peticion
       let fecha= data.infante.fecha_na.split("-"); 
       let fechaPadre= data.padres[0].fecha_na.split("-"); 
       
       console.log(data);
       this.datos_infante=data.infante;
       this.datos_padres=data.padres;
       console.log(this.datos_padres.length);
      //  lleno el formulario con los datos del infante
        this.FormaInfante.controls['nombre'].setValue(data.infante.nombre);
        this.FormaInfante.controls['nombre'].disable();
        
        this.FormaInfante.controls['apellido'].setValue(data.infante.apellido);
        this.FormaInfante.controls['apellido'].disable();
        
        this.FormaInfante.controls['direccion'].setValue(data.infante.direccion);
        this.FormaInfante.controls['DNI'].setValue(data.infante.DNI);
        this.FormaInfante.controls['telefono'].setValue(data.infante.telefono);
        console.log(fecha[2]+'/'+fecha[1]+"/"+fecha[0]);
        this.FormaInfante.controls['fecha_na'].setValue( fecha[2]+'/'+fecha[1]+"/"+fecha[0]);
      
       
       //lleno el formulario con los daos del padre
         this.FormaPadre.controls['nombre1'].setValue(data.padres[0].nombre);
         this.FormaPadre.controls['apellido1'].setValue(data.padres[0].apellido);
         this.FormaPadre.controls['direccion1'].setValue(data.padres[0].direccion);
         this.FormaPadre.controls['DNI1'].setValue(data.padres[0].DNI);
         this.FormaPadre.controls['telefono1'].setValue(data.padres[0].telefono);
         this.FormaPadre.controls['correo1'].setValue(data.padres[0].correo);
         this.FormaPadre.controls['fecha_na1'].setValue( fechaPadre[2]+'/'+fechaPadre[1]+"/"+fechaPadre[0]);
        //  si el service devuelve mas de un padre lo cargo al formulario
         if(this.datos_padres.length>1){
          this.segundoTutor=true;
          let fechaPadre2=  data.padres[1].fecha_na.split("-");
          console.log(fechaPadre2[2]+'/'+fechaPadre2[1]+"/"+fechaPadre2[0]);
          
          this.FormaPadre2.controls['nombre2'].setValue(data.padres[1].nombre);
          this.FormaPadre2.controls['apellido2'].setValue(data.padres[1].apellido);
          this.FormaPadre2.controls['direccion2'].setValue(data.padres[1].direccion);
          this.FormaPadre2.controls['DNI2'].setValue(data.padres[1].DNI);
          this.FormaPadre2.controls['telefono2'].setValue(data.padres[1].telefono);
          this.FormaPadre2.controls['correo2'].setValue(data.padres[1].correo);
          this.FormaPadre2.controls['fecha_na2'].setValue( fechaPadre2[2]+'/'+fechaPadre2[1]+"/"+fechaPadre2[0]);
         }
       },error=>{
         console.log(error);
       })
       
  })

}

enviarDatos(infante:Persona,padre1:Persona,padre2:Persona){
  if( !this.FormaInfante.dirty  && !this.FormaPadre.dirty){
    console.log('no se realizaron cambios');
  }

}


hasBaseDropZoneOver: boolean = false;
options: Object = {
  url: 'https://virtualkinder.com/subir/sube.php'
};
sizeLimit = 2000000;

handleUpload(data): void {
  console.log('handle upload');
  this.succes=false;
  if (data && data.response) {
    data = JSON.parse(data.response);
    this.uploadFile = data;
        if(data.status){
          this.succes=true;
         this.datos_infante.foto=data.generatedName;
         this.infante.imagen=data.generatedName;

          
        }
    this.upload=false;
  }
}

fileOverBase(e:any):void {
  this.hasBaseDropZoneOver = e;
}

beforeUpload(uploadingFile): void {
      console.log('handle upload');

  this.upload=true;
  if (uploadingFile.size > this.sizeLimit) {
    uploadingFile.setAbort();
        this.upload=false;

    alert('File is too large');
  }
}
validar(){
  console.log('validar');

}
cancelar(){
  this.router.navigate(['/buscar_infante']);
}



}