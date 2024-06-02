import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importación de módulos necesarios para el manejo de rutas
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service'; // Importación de servicio SharedDataService
import { HttpClient } from '@angular/common/http'; // Importación de módulo necesario para el manejo de solicitudes HTTP
import { ApiService } from 'src/app/services/api/api.service'; // Importación de servicio ApiService
import { Subject } from 'rxjs'; // Importación de módulo necesario para el manejo de observables

@Component({
  selector: 'app-facturas-tabla',
  templateUrl: './facturas-tabla.component.html',
  styleUrls: ['./facturas-tabla.component.css']
})
export class FacturasTablaComponent implements OnInit, OnDestroy {

  // Métodos dataTables para la configuración de la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // Variable para almacenar datos
  datos: any = [];
  // Método constructor para crear un objeto del componente
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private sharedDataService: SharedDataService, private apiService: ApiService, private http: HttpClient) {

  }

  verDetalle() {
    this.router.navigate(['/facturas/detalle-factura']);

  }


  someClickHandler(index: number): void {
    // Obtiene los datos de la fila seleccionada
    const rowData = this.datos[index];

    // Comprueba el estado de la factura
    if (rowData.estado === 'Pagada') {
      this.sharedDataService.setData("facturaSeleccionada", rowData);
      // Si la factura está pagada, redirige a la vista de detalle de factura con el ID como parámetro
      this.router.navigate(['/facturas/detalle-factura'], {
        queryParams: { id: rowData.id }
      });
    } else if (rowData.estado === 'Pendiente') {
      this.sharedDataService.setData("facturaSeleccionada", rowData);
      // Si la factura está pendiente, redirige a la vista de detalle de factura sin ningún parámetro adicional
      this.router.navigate(['/formas-pago'],{
        queryParams: { id: rowData.id }
      });
    } else {
      // Maneja cualquier otro estado de la factura según sea necesario
      console.log('Estado de factura desconocido');
    }
  }


  ngOnInit(): void {
    // Obtener el usuario almacenado en localStorage
    const userData = localStorage.getItem('user');

    if (userData !== null) {
      // Obtener el id del usuario
      const user = JSON.parse(userData);
      // Obtener los datos de los amarres del socio
      this.apiService.getFacturasID(user.id).subscribe((data: any) => {
        this.datos = data;

        
        this.dtTrigger.next(data);
      });
    }
  }

  ngOnDestroy(): void {
   
    this.dtTrigger.unsubscribe();
  }
}
