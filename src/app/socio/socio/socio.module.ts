import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocioComponent } from './socio.component';
import { MiembrosFormComponent } from './socio-miembros/miembros-form/miembros-form.component';
import { AmarresFormComponent } from './socio-amarres/amarres-form/amarres-form.component';
import { FacturasDetalleComponent } from './facturas-socio/facturas-detalle/facturas-detalle.component';
import { FacturasTablaComponent } from './facturas-socio/facturas-tabla/facturas-tabla.component';
import { NgxPrintModule } from 'ngx-print';
import { FormaPagoFormComponent } from './formas-pago/forma-pago-form/forma-pago-form.component';
import { DataTablesModule } from 'angular-datatables'; 
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { EmbarcacionesSocioFormComponent } from './embarcaciones-socio/embarcaciones-socio-form/embarcaciones-socio-form.component';



@NgModule({
  declarations: [
    SocioComponent,
    MiembrosFormComponent,
    AmarresFormComponent,
   FacturasDetalleComponent,
    FacturasTablaComponent,
    FormaPagoFormComponent,
    MessageDialogComponent,
    EmbarcacionesSocioFormComponent,
  

  ],
  imports: [
    CommonModule,
    NgxPrintModule,
    DataTablesModule,
    FormsModule,
    MatDialogModule

  ],
  exports: [
  FormaPagoFormComponent
  ]
})
export class SocioModule { }
