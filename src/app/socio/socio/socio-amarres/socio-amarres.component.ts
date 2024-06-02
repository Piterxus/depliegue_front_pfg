import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importación de módulos necesarios para el manejo de rutas
import { HttpClient } from '@angular/common/http'; // Importación de módulo necesario para el manejo de solicitudes HTTP
import { ApiService } from 'src/app/services/api/api.service'; // Importación de servicio ApiService
import { Subject } from 'rxjs'; // Importación de módulo necesario para el manejo de observables

@Component({
  selector: 'app-socio-amarres',
  templateUrl: './socio-amarres.component.html',
  styleUrls: ['./socio-amarres.component.css']
})
export class SocioAmarresComponent implements OnInit, OnDestroy{

  // Métodos dataTables para la configuración de la tabla
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // Variable para almacenar datos
  datos: any = [];
  transits: boolean = false;
  rentals: boolean = true;
  // Método constructor para crear un objeto del componente
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private http: HttpClient
  ) {

  }

  showTransits() {
    this.transits = true;
    this.rentals = false;
    this.datos = [];  // Clear existing data
    this.destroyDataTable();
    const userData = localStorage.getItem('user');

    if (userData !== null) {
      const user = JSON.parse(userData);
      this.apiService.getTransitsByUserId(user.id).subscribe((data: any) => {
        this.datos = data;
        this.dtTrigger.next(null);  // Trigger DataTable reinitialization
      });
    } else {
      console.error('No se encontró el usuario en localStorage');
    }
  }
  showRentals() {
    this.transits = false;
    this.rentals = true;
    this.datos = [];  // Clear existing data
    this.destroyDataTable();
    const userData = localStorage.getItem('user');

    if (userData !== null) {
      const user = JSON.parse(userData);
      this.apiService.getAlquileresByUserId(user.id).subscribe((data: any) => {
        this.datos = data;
        this.dtTrigger.next(null);  // Trigger DataTable reinitialization
      });
    } else {
      console.error('No se encontró el usuario en localStorage');
    }
  }

  navegarAFormulario() {

    this.router.navigate(['../formulario'], { relativeTo: this.activatedRoute, queryParams: { tipo: 'vacio' } })

  }

  someClickHandler(index: number): void {
    // Obtiene los datos de la fila seleccionada
    const rowData = this.datos[index];
   
    // Navega a formulario vista con los datos de la fila seleccionada
    // this.sharedDataService.setData("alquilerSeleccionado", rowData);
    this.router.navigate(['/amarres-socio/formulario'], {
      queryParams: { tipo: 'vista', ai: rowData.id, ct: rowData.costeAmarre, rg: rowData.regimen }  // O 'vacio' según tus necesidades
    }); // Si no es con ruta abosulta, no funciona

  }

  ngOnInit(): void {
    // Obtener el usuario almacenado en localStorage
    const userData = localStorage.getItem('user');

    if (userData !== null) {
      // Obtener el id del usuario
      const user = JSON.parse(userData);
      // Obtener los datos de los amarres del socio
      this.apiService.getAlquileresByUserId(user.id).subscribe((data: any) => {
        this.datos = data;
        console.log('Data obtenida de la pb', data);
      
        this.dtTrigger.next(data);
        // Notificar a DataTables después de obtener los datos

      });
    

    } else {
      console.error('No se encontró el usuario en localStorage');
    }
    // Configuración de DataTables
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json'
      }
    };

 
  }

  ngOnDestroy(): void {
    // Desuscribirse de los observables
    this.dtTrigger.unsubscribe();
  }
  private destroyDataTable() {
    $('.table').DataTable().clear().destroy();  // Clear and destroy the existing DataTable instance
  }

}
