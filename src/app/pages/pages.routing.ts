import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

// componentes
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: {title: 'Dashboard'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Ajustes de cuenta'} },
      { path: 'grafica1', component: Grafica1Component, data: {title: 'Gráfica #1'} },
      { path: 'progress', component: ProgressComponent, data: {title: 'ProgressBar'} },
      { path: 'promesas', component: PromesasComponent, data: {title: 'Promesas'} },
      { path: 'perfil', component: PerfilComponent, data: {title: 'Perfil'} },
      { path: 'rxjs', component: RxjsComponent, data: {title: 'RxJs'} },
      { path: 'search/:termino', component: SearchComponent, data: {title: 'Busquedas'} },

      // Mantenimientos
      { path: 'hospitales', component: HospitalesComponent, data: {title: ' Mantenimieto de Hospitales '} },
      { path: 'medicos', component: MedicosComponent, data: {title: 'Mantenimieto de Medicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: {title: 'Mantenimieto de Medicos'} },

      // Rutas admin
      { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: {title: 'Mantenimieto de Usuarios'} },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
