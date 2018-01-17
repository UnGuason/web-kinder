import { Router } from '@angular/router';
import { BaseDatosService } from 'app/services/base-datos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar-maestra',
  templateUrl: './buscar-maestra.component.html',
  styleUrls: ['./buscar-maestra.component.css']
})


export class BuscarMaestraComponent implements OnInit {

  modalData: {
    _cliente: any;
    aux: string;
  };
  buscando:boolean=false;

  // array of all items to be paged
    // private allItems: any[]=[];//para borrar
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];


  maestras: any[] = [];
  cantidad: number = 0;
  cantidad_registros: number = 0;
  paginacion: number[];
  currentPage: any;
  formBusqueda: FormGroup;
  uid:string;
  cliente:any;
  showDialog:boolean=false;
  soloVigentes =false; 
  public radioGroupForm: FormGroup;

  constructor(private dbService:BaseDatosService,private router:Router) {
    this.formBusqueda = new FormGroup({
      'parametro': new FormControl('', [Validators.required, Validators.minLength(3)])
    });
   }

  ngOnInit() {
    this.dbService.traerMaestras().subscribe(data => {
      if (!data.error) {
        console.log(data);
        this.maestras = data.maestras;
      }
    
    },error=>{
      console.log(error);
    });

    this.formBusqueda.valueChanges.subscribe(data => {
      if (this.formBusqueda.valid) {
        this.dbService.buscarMaestraPorParametro(this.formBusqueda.controls.parametro.value).subscribe(data => {
          if (!data.error) {
            console.log(data);
            this.maestras =data;
       
       
          }
          else {
            console.log('ocurrio error');

            return;
          }
        }, error => {
          console.log(error);
        })
      }else if (this.formBusqueda.controls.parametro.value.length < 3){
        this.cantidad_registros = 0;
        this.maestras = [];
       

      }
    })
}


editarMaestra(id:string){
  this.router.navigate(['/editar_maestra', id]);
  
  

}
}
