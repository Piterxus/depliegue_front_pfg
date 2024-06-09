import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovilModule } from './movil/movil.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PlantillaModule } from './plantilla/plantilla.module';
import { EmbarcacionModule } from './embarcacion/embarcacion.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { GuardiaCivilModule } from './guardia-civil/guardia-civil.module';
import { TransitoModule } from './transito/transito.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { PlazaBaseModule } from './plaza-base/plaza-base.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { PanelComponent } from './panel/panel.component';
import { SocioAmarresComponent } from './socio/socio/socio-amarres/socio-amarres.component';
import { FormasPagoComponent } from './socio/socio/formas-pago/formas-pago.component';
import { FacturasSocioComponent } from './socio/socio/facturas-socio/facturas-socio.component';
import { PerfilSocioComponent } from './socio/socio/perfil-socio/perfil-socio.component';
import { SocioMiembrosComponent } from './socio/socio/socio-miembros/socio-miembros.component';
import { SocioModule } from './socio/socio/socio.module';
import { NgxPrintModule } from 'ngx-print';
import { DataTablesModule } from 'angular-datatables'; 
import Pusher from 'pusher-js'; // Debe estar presente aunque no se use
import { ChatComponentComponent } from './chat-component/chat-component.component';
import { EmbarcacionesSocioComponent } from './socio/socio/embarcaciones-socio/embarcaciones-socio.component';
import { ShipAnimationComponent } from './ship-animation/ship-animation.component';
@NgModule({
  declarations: [AppComponent, ErrorHandlerComponent, PanelComponent, SocioAmarresComponent, FormasPagoComponent, FacturasSocioComponent, PerfilSocioComponent, SocioMiembrosComponent, ChatComponentComponent, EmbarcacionesSocioComponent, ShipAnimationComponent],

  imports: [
    BrowserModule,
    MovilModule,
    DashboardModule,
    AppRoutingModule,
    PlantillaModule,
    EmbarcacionModule,
    NotificacionesModule,
    GuardiaCivilModule,
    TransitoModule,
    BrowserAnimationsModule,
    LoginModule,
    PlazaBaseModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SocioModule, // Aunque no  es necesario importar el módulo SocioModule. Lo añado para recordarlo e investigar.
    NgxPrintModule,
    DataTablesModule
    

  ],

  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
],
  bootstrap: [AppComponent],
})
export class AppModule { }
