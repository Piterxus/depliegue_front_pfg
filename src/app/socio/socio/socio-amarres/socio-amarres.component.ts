import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importación de módulos necesarios para el manejo de rutas
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service'; // Importación de servicio SharedDataService
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
  // Método constructor para crear un objeto del componente
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private apiService: ApiService,
    private http: HttpClient
  ) {

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
      queryParams: { tipo: 'vista', ai: rowData.id }  // O 'vacio' según tus necesidades
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

        console.log('Después de la llamada a la API:', this.datos);
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

}
