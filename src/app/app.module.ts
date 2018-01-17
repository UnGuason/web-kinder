import { MensajeriaService } from './services/mensajeria.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuscarComponent } from './components/infantes/buscar/buscar.component';
import { AltaPadreComponent } from './components/infantes/alta/alta-padre/alta.padre.component';
import { AltaInfanteComponent } from './components/infantes/alta/alta-infante/alta.infante.component';
import { AltaComponent } from './components/infantes/alta/alta.component';
import { BaseDatosService } from './services/base-datos.service';
import { Ng2UploaderModule } from 'ng2-uploader';
import { DragulaModule } from 'ng2-dragula';

import { CalendarModule } from 'primeng/primeng';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import * as firebase from 'firebase';
import { AngularFireModule } from "angularfire2";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ActividadComponent } from './components/actividad/actividad.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { APPROUTING } from "app/app.routes";
import { HomeComponent } from "app/components/home/home.component";
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'



import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EditarComponent } from './components/infantes/editar/editar.component';
import { AltaMaestraComponent } from './components/maestras/alta-maestra/alta-maestra.component';
import { BuscarMaestraComponent } from './components/maestras/buscar-maestra/buscar-maestra.component';
import { EditarMaestraComponent } from './components/maestras/editar-maestra/editar-maestra.component';
import { AltaSalaComponent } from './components/salas/alta-sala/alta-sala.component';

import {DndModule} from 'ng2-dnd';
import { ListaSalaComponent } from './components/salas/lista-sala/lista-sala.component';
import { EditarSalaComponent } from './components/salas/editar-sala/editar-sala.component';
import { NombreCorreoPipe } from './pipes/nombre-correo.pipe';
import { FotoCorreoPipe } from './pipes/foto-correo.pipe';
import { DialogComponent } from './components/dialog/dialog.component';
import { ActividadPipe } from './pipes/actividad.pipe';



export const environment = {

  firebase: {

    apiKey: "AIzaSyASALb3bHbqPkkGyJzy8wY8FvLZ16Woncs",
    authDomain: "firechat-b699f.firebaseapp.com",
    databaseURL: "https://firechat-b699f.firebaseio.com",
    projectId: "firechat-b699f",
    storageBucket: "firechat-b699f.appspot.com",
    messagingSenderId: "504245772429"
  
  
  }
};
firebase.initializeApp(environment.firebase);


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ActividadComponent,
    MensajeComponent,
    AltaComponent,
    AltaInfanteComponent,
    AltaPadreComponent,
    BuscarComponent,
    EditarComponent,
    AltaMaestraComponent,
    BuscarMaestraComponent,
    EditarMaestraComponent,
    AltaSalaComponent,
    ListaSalaComponent,
    EditarSalaComponent,
    NombreCorreoPipe,
    FotoCorreoPipe,
    DialogComponent,
    ActividadPipe
  ],
  imports: [NgbModule.forRoot(),
    DndModule.forRoot(),
    BrowserModule,
     BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Ng2UploaderModule,
    APPROUTING,
    AngularFireModule.initializeApp(environment.firebase),AngularFireAuthModule,
    CalendarModule,
    Angular2FontawesomeModule, BrowserAnimationsModule,    NgxQRCodeModule
    
  ],
  providers: [AuthService,AuthGuardService,BaseDatosService,MensajeriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
