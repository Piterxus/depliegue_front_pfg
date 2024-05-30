import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { Location } from '@angular/common';
import { DialogService } from 'src/app/services/dialog/dialog.service';
@Component({
  selector: 'app-formas-pago',
  templateUrl: './formas-pago.component.html',
  styleUrls: ['./formas-pago.component.css']
})
export class FormasPagoComponent implements OnInit {
  tipoFormulario: string = '';
  mostrarTablas: boolean = true;
  facturaSeleccionada: any;
  facturaId: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private apiservice: ApiService, private sharedDataService: SharedDataService, private _location: Location, private dialogService: DialogService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.facturaId = params['id'];


    });
    this.mostrarFactura();
  }
  mostrarFormulario(tipo: string) {
    console.log('tipo', tipo);
    this.tipoFormulario = tipo;
    this.router.navigate([], { relativeTo: this.route, queryParams: { tipo: tipo }, queryParamsHandling: 'merge' });
    this.mostrarTablas = false;
  }

  volver() {
    this.router.navigate([], { relativeTo: this.route, queryParams: { tipo: null }, queryParamsHandling: 'merge' });
    this.mostrarTablas = true;
  }

  mostrarFactura() {
    this.apiservice.getFacturaID(this.facturaId).subscribe((data: any) => {
      console.log('data', data);
      this.facturaSeleccionada = data;
    }, (error) => {
      console.log('error', error);
    });
  }

  pagar() {
    const tieneFondos = Math.random() < 0.5;

    if (tieneFondos) {
      this.apiservice.update(this.facturaId, "factura", { estado: 'Pagada' }).subscribe((data: any) => {
        console.log('data', data);

        // this.router.navigate(['/socio/facturas']);
      }, (error) => {
        console.log('error', error);
      }
      );
      
      this.dialogService.mostrarMensaje({title:"", message: 'Pago realizado con éxito'});
      this._location.back();
    } else {
      this.dialogService.mostrarMensaje({title: "", message: 'No se ha podido realizar el pago'});
      this._location.back();
    }




  }

}
