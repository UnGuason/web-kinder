import { Persona } from './../../../../clases/persona';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Constantes } from "app/clases/constantes";

@Component({
  selector: 'app-alta-infante',
  templateUrl: './alta.infante.component.html',
  styleUrls: ['./alta.infante.component.css']
})
export class AltaInfanteComponent implements OnInit {
  public upload:boolean=false;//si la imagen esta subiendo
  public succes:boolean=false;//si la imagen subio correctamente
  private padre_completo:boolean=false;
  private padre_completo2:boolean=false;
  private infatnte_completo:boolean=false;


  public imagen:string='default.png';
  @Output() infanteComplete = new EventEmitter();
  @Input() _persona:Persona;

  public fecha:Date;
  public es= Constantes.CALENDAR;
   uploadFile: any;
   datos_infante:any;

Forma:FormGroup;
  constructor() { 
    this.fecha = new Date();
    this.Forma = new FormGroup({
      'nombre': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'apellido': new FormControl('',Validators.required),
      'fecha': new FormControl('', Validators.required),   
      'direccion': new FormControl('', Validators.required),   
      'documento': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required)



    });
 
    this.Forma.valueChanges.subscribe(data => {
      if(this.Forma.valid){
        data.imagen=this.imagen;

      this.datos_infante=data;
       this.infanteComplete.emit(this.datos_infante);
        // envia los datos del formulario cuando esta completo


      }
    })

  }

myUploader(event) {
  console.log(event);
    //event.files == files to upload
}

  ngOnInit() {
    
        console.log('onInit');
        //recibe un objeto persona ,si existe lo carga
        if(this._persona){
          this.Forma.controls['nombre'].setValue(this._persona.nombre);
          this.Forma.controls['apellido'].setValue(this._persona.apellido);
          this.Forma.controls['documento'].setValue(this._persona.documento);
          this.Forma.controls['fecha'].setValue(this._persona.fecha_nacimineto);
          this.Forma.controls['apellido'].setValue(this._persona.apellido);
          this.Forma.controls['direccion'].setValue(this._persona.direccion);
          this.Forma.controls['telefono'].setValue(this._persona.telefono)

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
            this.imagen=data.generatedName;
            console.log(this.imagen);

           this.validarFormulario();
            
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

  validarFormulario(){
      if(this.Forma.valid){
       this.datos_infante.imagen=this.imagen;
        console.log(this.datos_infante);
        this.infanteComplete.emit(this.datos_infante);
        // envia los datos del formulario cuando esta completo


      }
    
  }

}
