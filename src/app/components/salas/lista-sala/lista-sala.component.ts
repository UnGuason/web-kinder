import { BaseDatosService } from './../../../services/base-datos.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-lista-sala',
  templateUrl: './lista-sala.component.html',
  styleUrls: ['./lista-sala.component.css']
})
export class ListaSalaComponent  implements OnInit{
   
    salas: any[] = [];
    formBusqueda: FormGroup;
    
    constructor(private _db:BaseDatosService,private route:Router){
        this.formBusqueda = new FormGroup({
            'parametro': new FormControl('', [Validators.required, Validators.minLength(3)])
          });
    }



    ngOnInit() {
            this._db.ListarSala().subscribe(data=>{
                this.salas=data.sala;
            })
    }


    editarSala(id:string){
        this.route.navigate(['/editar_sala', id]);
        
        
      
      }  
  
}