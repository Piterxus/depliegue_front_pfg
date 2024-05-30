import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenidoTransitoComponent } from './transito/contenido-transito/contenido-transito.component';
import { TablaTransitoComponent } from './transito/tabla-transito/tabla-transito.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PanelComponent } from './panel/panel.component';
import { EmbarcacionesComponent } from './embarcacion/embarcaciones/embarcaciones.component';
import { CardIncidenciaComponent } from './movil/card-incidencia/card-incidencia.component';
import { CardConfirmacionTransitoComponent } from './movil/card-confirmacion-transito/card-confirmacion-transito.component';
import { NotificacionesComponent } from './notificaciones/notificaciones/notificaciones.component';
import { TablaGuardiaComponent } from './guardia-civil/tabla-guardia/tabla-guardia.component';
import { PerfilSocioComponent } from './socio/socio/perfil-socio/perfil-socio.component';
import { SocioMiembrosComponent } from './socio/socio/socio-miembros/socio-miembros.component';
import { MiembrosFormComponent } from './socio/socio/socio-miembros/miembros-form/miembros-form.component';
import { SocioAmarresComponent } from './socio/socio/socio-amarres/socio-amarres.component';
import { AmarresFormComponent } from './socio/socio/socio-amarres/amarres-form/amarres-form.component';
import { FacturasSocioComponent } from './socio/socio/facturas-socio/facturas-socio.component';
import { FacturasTablaComponent } from './socio/socio/facturas-socio/facturas-tabla/facturas-tabla.component';
import { FacturasDetalleComponent } from './socio/socio/facturas-socio/facturas-detalle/facturas-detalle.component';
import { FormasPagoComponent } from './socio/socio/formas-pago/formas-pago.component';
import { FormaPagoFormComponent } from './socio/socio/formas-pago/forma-pago-form/forma-pago-form.component';
import { ContenidoPbComponent } from './plaza-base/contenido-pb/contenido-pb.component';
import { TablaTripulanteComponent } from './transito/tabla-tripulante/tabla-tripulante.component';
import { FormularioPbComponent } from './plaza-base/formulario-pb/formulario-pb.component';
import { TablaPbComponent } from './plaza-base/tabla-pb/tabla-pb.component';
import { LoginComponent } from './login/login/login.component';
import { ContenidoComponent } from './plantilla/contenido/contenido.component';
import { TablaComponent } from './embarcacion/tabla/tabla.component';
import { FormularioEmbarcacionComponent } from './embarcacion/formulario-embarcacion/formulario-embarcacion.component';
import { FormularioTransitoComponent } from './transito/formulario-transito/formulario-transito.component';
import { PlantillaGuardamuellesComponent } from './movil/plantilla-guardamuelles/plantilla-guardamuelles.component';
import { roleGuard } from './role.guard';
import { ListaCardsComponent } from './movil/lista-cards/lista-cards.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { EmbarcacionesSocioComponent } from './socio/socio/embarcaciones-socio/embarcaciones-socio.component';
import { EmbarcacionesSocioFormComponent } from './socio/socio/embarcaciones-socio/embarcaciones-socio-form/embarcaciones-socio-form.component';




// Se importan los componentes que se van a utilizar en las rutas
// Se definen las rutas de la aplicación
// Se exporta la clase AppRoutingModule
// CanActivate es un guard que se utiliza para verificar si el usuario tiene el rol necesario para acceder a la ruta
// Se importa el guard roleGuard
// De esta manera las rutas se protegen con el guard roleGuard y rediriigen al componente correspondiente
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'panel',
    component: ContenidoComponent,
    children: [
      {
        path: '',
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario

        component: PanelComponent,
        data: { role: '5' }
      }
    ]
  },
  {
    path: 'perfil',
    component: ContenidoComponent,
    children: [
      {
        path: '',
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario

        component: PerfilSocioComponent,
        data: { role: '5' }
      }
    ]
  },
  {
    path: 'miembros',
    component: ContenidoComponent,
    children: [
      {
        path: '',
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario

        component: SocioMiembrosComponent,
        data: { role: '5' }
      },
      {
        path: 'formulario',
        component: MiembrosFormComponent,
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario
        data: { role: '5', breadcrumb: 'Formulario'}
      }
    ]
  },
  {
    path: 'amarres-socio',
    component: ContenidoComponent,
    children: [
      {
        path: '',
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario

        component: SocioAmarresComponent,
        data: { role: '5' }
      },
      {
        path: 'formulario',
        component: AmarresFormComponent,
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario
        data: { role: '5', breadcrumb: 'Formulario'}
      }
    ]
  },
  {
    path: 'facturas',
    component: ContenidoComponent,
    children: [
      {
        path: '',
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario

        component: FacturasTablaComponent,
        data: { role: '5' }
      },
      {
        path: 'periodo-facturas',
        component: FacturasSocioComponent,
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario
        data: { role: '5' }
      },
      {
        path: 'detalle-factura',
        component: FacturasDetalleComponent,
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario
        data: { role: '5', breadcrumb: 'Detalle de factura'}
      }
    ]
  },
  {
    path: 'formas-pago',
    component: ContenidoComponent,
    children: [
      {
        path: '',
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario

        component: FormasPagoComponent,
        data: { role: '5'}
      },
      {
        path: 'formulario',
        component: FormaPagoFormComponent,
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario
        data: { role: '5', breadcrumb: 'Formulario'}
      }
    ]
  },
  {
    path: 'embarcaciones-socio',
    component: ContenidoComponent,
    children: [
      {
        path: '',
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario

        component: EmbarcacionesSocioComponent,
        data: { role: '5'}
      },
      {
        path: 'formulario',
        component: EmbarcacionesSocioFormComponent,
        canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario
        data: { role: '5', breadcrumb: 'Formulario'}
      }
    ]
  },
  // {
  //   path: 'dashboard',
  //   component: ContenidoComponent,
  //   children: [
  //     {
  //       path: '',
  //       canActivate: [roleGuard], // Se utiliza el guard para verificar el rol del usuario

  //       component: DashboardComponent,
  //       data: { role: '2' }
  //     }
  //   ]
  // },
  {
    path: 'embarcaciones',
    canActivate: [roleGuard],
    data: { role: '2' },
    component: ContenidoComponent,
    children: [
      {
        path: 'tabla',
        component: TablaComponent,
      },
      {
        path: 'formulario',
        component: FormularioEmbarcacionComponent,
      },
      {
        path: '',
        redirectTo: 'tabla',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'plazabase',
    canActivate: [roleGuard],
    data: { role: '2' },
    component: ContenidoComponent,
    children: [
      {
        path: 'tabla',
        component: TablaPbComponent,
      },
      {
        path: 'formulario',
        component: FormularioPbComponent,
      },
      {
        path: '',
        redirectTo: 'tabla',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'transito',
    canActivate: [roleGuard],
    data: { role: '2' },
    component: ContenidoComponent,
    children: [
      {
        path: 'tabla',
        component: TablaTransitoComponent,
      },
      {
        path: 'formulario',
        component: FormularioTransitoComponent,
      },
      {
        path: '',
        redirectTo: 'tabla',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'guardiacivil',
    canActivate: [roleGuard],
    data: { role: '4' },
    component: ContenidoComponent, // O el componente que corresponda

    children: [
      {

        path: '',

        component: TablaGuardiaComponent
      }
    ]
  },
  {
    path: 'notificaciones',
    canActivate: [roleGuard],
    data: { role: '2' },
    component: ContenidoComponent, // O el componente que corresponda
    children: [
      {
        path: '',
        component: NotificacionesComponent,
      },
    ],
  },
  {
    path: 'movil',
    canActivate: [roleGuard],
    data: { role: '3' },
    component: PlantillaGuardamuellesComponent, 
    children: [
      { path: '', component: ListaCardsComponent },
    { path: 'card-incidencia', component: CardIncidenciaComponent },
      { path: 'card-confirmacion-transito', component: CardConfirmacionTransitoComponent },
    ]
  },
  {
    path: '**',
    component: ErrorHandlerComponent,
   //  redirectTo: '/login' //Por eso redirigia al login. Doble asterisco es para cualquier ruta que no exista.
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
