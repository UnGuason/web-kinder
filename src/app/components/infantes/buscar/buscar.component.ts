import { Router } from '@angular/router';
import { BaseDatosService } from './../../../services/base-datos.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ClientesPipe } from './../../../../pipes/clientes.pipe';
// import { PagerService } from './../../../../services/pager.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { DatabaseService } from './../../../../services/database.service';
// import { DbFirebaseService } from './../../../../services/db-firebase.service';
// import { AfireService } from './../../../../services/afire.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalPolizas') modalPolizas: TemplateRef<any>;
  

  modalData: {
    _cliente: any;
    aux: string;
  };
  buscando:boolean=false;
   cargando:boolean=true;
  // array of all items to be paged
    private allItems: any[]=[];
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];

      link:string ='https://virtualkinder.com/subir/uploads/';
  infantes: any[] = [];
  cantidad: number = 0;
  cantidad_registros: number = 0;
  paginacion: number[];
  currentPage: any;
  formBusqueda: FormGroup;
  uid:string;
  cliente:any;
  showDialog:boolean=false;
  soloVigentes =false; 
  padres:any[]=[];
  public radioGroupForm: FormGroup;
  constructor(private dbService:BaseDatosService ,private router:Router,private sanitizer:DomSanitizer){
    this.formBusqueda = new FormGroup({
            'parametro': new FormControl('', [Validators.required, Validators.minLength(3)])
          });
       

}
ngOnInit() {
  // this.dbService.buscarInfante(this.uid,this.formBusqueda.controls.parametro.value, '1').subscribe(data => {
  //   if (!data.error) {
  //     console.log(data);
  //     this.cargando=false;
  //     this.infantes = data.infantes;
  //     this.cantidad_registros = data.cantidad;
 
  //   }
  //   else {
  //     this.cargando=false;
      
  //     console.error(data);
      
  //     return;
  //   }
  // }, error => {
  //   this.cargando=false;
    
  //   console.log(error);
  // })


  this.formBusqueda.valueChanges.subscribe(data => {
          if (this.formBusqueda.valid) {
            this.dbService.buscarPorParametro(this.formBusqueda.controls.parametro.value).subscribe(data => {
              if (!data.error) {
                console.log(data);
                this.infantes =data;
           
           
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
              this.infantes = [];
           
    
          }
        })
      
      
    }
  editarInfante(id:string){

  console.log('editar');
    this.router.navigate(['/editar', id]);
    
    
  }
  editarSala(id:string){
    this.router.navigate(['/editar_sala', id]);
    
    
  
  }
  verPadres(id:string){
    this.dbService.listaPadres(id).subscribe(data=>{
      console.log(data);
      if(!data.error){
        this.padres=data.padres;
        this.showDialog= !this.showDialog;
        
      }
    })
     
  }

  
//   constructor(public dbService: DatabaseService,
//               private cdr: ChangeDetectorRef,private afService:AfireService,
//                private pagerService: PagerService,
//                private modal: NgbModal) {
//                this.formBusqueda = new FormGroup({
//       'parametro': new FormControl('', [Validators.required, Validators.minLength(3)])
//     });
//     this.uid=localStorage.getItem('uid');
//     if(!this.uid) {
//       this.afService.logout();
//       return;
//     }
//     this.formBusqueda.valueChanges.subscribe(data => {
//       if (this.formBusqueda.valid) {
//         this.dbService.buscarParametro(this.uid,this.formBusqueda.controls.parametro.value, '1').subscribe(data => {
//           if (!data.error) {
//             console.log(data);
//             this.clientes = data.clientes;
//             this.cantidad_registros = data.cantidad;
//             this.allItems=data.clientes;
       
//             this.setPage(1);
//           }
//           else {
//             console.log('ocurrio error');

//             return;
//           }
//         }, error => {
//           console.log(error);
//         })
//       }else if (this.formBusqueda.controls.parametro.value.length ==0){
//         this.cantidad_registros = 0;
//           this.allItems = [];
//           this.setPage(0);
       

//       }
//     })
//   }
//   setPage(page: number) {
//     console.log('setPage');
//         if (page < 1 || page > this.pager.totalPages) {
//             return;
//         }
//  
//         // get pager object from service
//         this.pager = this.pagerService.getPager(this.cantidad_registros, page);
//  
//         // get current page of items
//       this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
// }

//   ngOnInit() {
  
  
   
//   }


//   consultar(index: string) {

//     if (this.formBusqueda.valid) {
//       this.currentPage = index;

//       this.dbService.buscarParametro(this.uid,this.formBusqueda.controls.parametro.value, index).subscribe(data => {
//         if (!data.error) {
//           console.log(data);
          
//        this.clientes = data.clientes;
//         this.cantidad_registros = data.cantidad;
//         // this.paginacion = this.crearPaginacion(this.cantidad_registros);
//         // this.currentPage = 1;
//               this.allItems = data.clientes;
 

//               console.log('indice', index);
    
//         }
//         else {
//           console.log('ocurrio error');

//           return;
//         }
//       }, error => {
//         console.log(error);
//       })
//     }

//     else {
//   this.cantidad_registros = 0;
//         this.allItems =[];
//         this.setPage(0);

       
//     }
//   }
//   consultar_prametro(index: string) {
//     this.currentPage = index;
//     this.dbService.buscarClientesPaginados(this.uid,index).subscribe(data => {
//       if (!data.error) {
//         console.log(data);
//         this.clientes = data.clientes;
//         this.setPage(1);
//       }
//       else {
//         console.log('ocurrio error');

//         return;
//       }
//     }, error => {
//       console.log(error);
//     })

//   }
//   validateDoc(tipo: string): string {
//     this.cantidad = this.cantidad + 1;
//     if (!tipo) {
//       return "Dni"

//     } else {
//       return tipo;
//     }
//   }
//   ngAfterViewInit() {
//     this.cdr.detectChanges();
//   }


//   crearPaginacion(cantidad: number): number[] {
//     let aux: number[] = [];
//     let result = 0;
//     let indice_auxiliar: number = 0;
//     for (var index = 1; cantidad > 20; index++) {
//       aux.push(index);
//       cantidad = cantidad - 20;
//       indice_auxiliar = index;

//     } if (cantidad > 1) {
//       console.log(indice_auxiliar);
//       indice_auxiliar = indice_auxiliar + 1;
//       console.log(indice_auxiliar);

//       aux.push(indice_auxiliar);
//     }
//     return aux;

//   }
//   mostrarCliente(_cliente:any){
//     let aux :string='asdasd';
//     this.cliente=_cliente;
//     this.polizas=[];
//     // this.buscarPoliza(_cliente.codigo);
//     this.modalData = { _cliente,aux };
//     // this.showDialog = !this.showDialog;
//     this.modal.open(this.modalContent, { size: 'sm' });
    

//   }


//    buscarPoliza(cliente:string,_cliente:any){
//     this.cliente=_cliente;
    
//      let aux :string='asdasd';
     
//     this.modalData = { _cliente,aux };
    
//     this.modal.open(this.modalPolizas, { size: 'lg' });
    
//      this.buscando = true;
//         this.dbService.buscarPolizasCliente('uid','asd', cliente).subscribe(data => {
//         if (!data.error) {
//           console.log(data);
//           this.polizas= data.poliza;
//           this.buscando=false;
         
//         }
//         else {
//           console.log('ocurrio error');
//                     this.buscando=false;


//           return;
//         }
//       }, error => {
//         console.log(error);
//                   this.buscando=false;

//       })
//  }

}
