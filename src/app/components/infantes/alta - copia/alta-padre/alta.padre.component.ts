import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Constantes } from "app/clases/constantes";

@Component({
  selector: 'app-alta-padre',
  templateUrl: './alta.padre.component.html',
  styleUrls: ['./alta.padre.component.css']
})
export class AltaPadreComponent implements OnInit {
  public Forma: FormGroup;
  public FormaSegudnoTutor: FormGroup;

  public secondTutor: boolean = false;//toma el valor del checkBox para agregar o no el segundo  tutor
  public fecha: Date;
  public es = Constantes.CALENDAR;//constantes calendar son los meses y dias del año
  @Output() padreComplete = new EventEmitter();// evento que se lanza cuando el padre esta completo
  @Output() secondTutorComplete = new EventEmitter(); // evento que se lanza cuando el segundo padre  esta completo
  @Output() buttonFalse = new EventEmitter();//emite si se va a agregar un segundo tutor
   @Output() formInvalido = new EventEmitter();//emite cuando los formularios son invalidos
   
   segundoPadre=false;

  constructor() {
    this.fecha = new Date();
    this.Forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido': new FormControl('', Validators.required),
      'correo': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'fecha': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'documento': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required)



    });

    this.FormaSegudnoTutor = new FormGroup({
      'nombre2': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellido2': new FormControl('', Validators.required),
      'correo2': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
      'fecha2': new FormControl('', Validators.required),
      'direccion2': new FormControl('', Validators.required),
      'documento2': new FormControl('', Validators.required),
      'telefono2': new FormControl('', Validators.required)
    });


    this.Forma.valueChanges.subscribe(data => {

      // console.log('Form changes', data);
      if (this.Forma.valid ) {
        this.padreComplete.emit(data);

      } else {
        data={
          'padre':'padre1'
        }
        this.formInvalido.emit(data);

      }
    });

    this.FormaSegudnoTutor.valueChanges.subscribe(data => {

      // console.log('Form changes', data);
      if ( this.FormaSegudnoTutor.valid ) {
        this.secondTutorComplete.emit(data);

      } else  {
            data={
          'padre':'padre2'
        }
        this.formInvalido.emit(data);

      

      }
    });



  }

  ngOnInit() {
  }
  emitirFalse() {

    this.buttonFalse.emit(this.secondTutor);

  }





}
