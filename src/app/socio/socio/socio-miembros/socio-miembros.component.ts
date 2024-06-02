import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Importación de módulos necesarios para el manejo de rutas
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service'; // Importación de servicio SharedDataService
import { HttpClient } from '@angular/common/http'; // Importación de módulo necesario para el manejo de solicitudes HTTP
import { ApiService } from 'src/app/services/api/api.service'; // Importación de servicio ApiService
import { Subject } from 'rxjs'; // Importación de módulo necesario para el manejo de observables

@Component({
  selector: 'app-socio-miembros',
  templateUrl: './socio-miembros.component.html',
  styleUrls: ['./socio-miembros.component.css']
})
export class SocioMiembrosComponent implements OnInit, OnDestroy{

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
  calcularEdad(fechaNacimiento: string): number {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  }

  someClickHandler(index: number): void {
    // Obtiene los datos de la fila seleccionada
    const rowData = this.datos[index];

    // Navega a formulario vista con los datos de la fila seleccionada
    // this.sharedDataService.setData("miembroSeleccionado", rowData);
    this.router.navigate(['/miembros/formulario'], {
      queryParams: { tipo: 'vista', mi : rowData.id }  // O 'vacio' según tus necesidades
    }); // Si no es con ruta abosulta, no funciona

  }

  ngOnInit(): void {
    // Obtener el usuario almacenado en localStorage
    const userData = localStorage.getItem('user');
    if (userData !== null) {
      const user = JSON.parse(userData);
      // Obtener el ID de usuario
      const userId = user.id;
      // Llamar al método getFamiliaresID con el ID de usuario
      this.apiService.getFamiliaresID(userId).subscribe(
        (data: any) => {
          this.datos = data;
         
          this.dtTrigger.next(data);
        }
      );
    } else {
      console.error('No se encontró el usuario en localStorage');
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.25/i18n/Spanish.json'
      },
    };
    

  }
    // Método para destruir en el componente
    ngOnDestroy(): void {
      // Limpia el dtTrigger para evitar problemas de memoria
      this.dtTrigger.unsubscribe();
    }


}
