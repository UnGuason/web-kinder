import { EditarSalaComponent } from './components/salas/editar-sala/editar-sala.component';
import { ListaSalaComponent } from './components/salas/lista-sala/lista-sala.component';
import { AltaSalaComponent } from './components/salas/alta-sala/alta-sala.component';
import { EditarMaestraComponent } from './components/maestras/editar-maestra/editar-maestra.component';
import { BuscarMaestraComponent } from './components/maestras/buscar-maestra/buscar-maestra.component';
import { AltaMaestraComponent } from './components/maestras/alta-maestra/alta-maestra.component';
import { EditarComponent } from './components/infantes/editar/editar.component';
import { BuscarComponent } from './components/infantes/buscar/buscar.component';
import { AltaComponent } from './components/infantes/alta/alta.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CanActivate } from '@angular/router/router';
import { ActividadComponent } from './components/actividad/actividad.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "app/components/home/home.component";


const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'mensaje', component: MensajeComponent,canActivate:[AuthGuardService]  },
    { path: 'actividad', component:ActividadComponent,canActivate:[AuthGuardService] },
    { path: 'alta', component:AltaComponent,canActivate:[AuthGuardService] },
    { path: 'buscar_infante', component:BuscarComponent,canActivate:[AuthGuardService] },
    { path: 'alta_maestra', component:AltaMaestraComponent,canActivate:[AuthGuardService] },
    { path: 'buscar_maestra', component:BuscarMaestraComponent,canActivate:[AuthGuardService] },
    { path: 'alta_sala', component:AltaSalaComponent,canActivate:[AuthGuardService] },
    { path: 'lista_sala', component:ListaSalaComponent,canActivate:[AuthGuardService] },
    { path: 'editar_sala/:id', component:EditarSalaComponent,canActivate:[AuthGuardService] },
    
    
    
    
    



    { path: 'editar_maestra/:id', component:EditarMaestraComponent,canActivate:[AuthGuardService] },
    
    { path: 'editar/:id', component:EditarComponent,canActivate:[AuthGuardService] },
    
    
    

    { path: '**', pathMatch:'full', redirectTo:'home' },
   
    ];

export const APPROUTING = RouterModule.forRoot(ROUTES);