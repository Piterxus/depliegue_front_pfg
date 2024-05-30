import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { catchError } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Map, tileLayer, marker, LatLngExpression } from 'leaflet';
// import * as L from 'leaflet';


@Component({
  selector: 'app-amarres-form',
  templateUrl: './amarres-form.component.html',
  styleUrls: ['./amarres-form.component.css']
})
export class AmarresFormComponent implements OnInit {
  mostrarVacio: boolean = false;
  modoVista: boolean = true;
  modoEdicion: boolean = false;
  alquilerSeleccionado: any = { datos_tecnicos: '' };
  data: any;
  userId: string = "";
  mostrarForm: boolean = false;
  tipoAmarre: boolean = true;
  dimensiones: boolean = false;
  mostrarAmarres: boolean = false;
  mostrarPlazasBase: boolean = false;
  amarreId: string = "";
  embarcaciones: any = [];
  fechaInicioAmarre: string = "";
  fechaFinAmarre: string = "";
  fechaMaximoFinAmarre: string = "";
  fechaInicio: string = "";
  fechaFin: string = "";
  minFechaFin: string = "";
  constructor(private router: Router, private sharedDataService: SharedDataService, private activatedRoute: ActivatedRoute, private apiservice: ApiService, private dialogService: DialogService) { }
  onMostrarFormulario(tipo: string) {
    // Si el tipo es vacío, muestra el formulario vacío
    if (tipo == 'vacio') {
      this.mostrarVacio = true;
    } else {
      this.mostrarVacio = false;
    }

  }
  volver() {
    this.router.navigate(['/amarres-socio']);
  }
  eliminarAlquiler() {
    this.apiservice.delete(this.alquilerSeleccionado.id, "alquiler").subscribe(
      (response) => {
        // Mostrar el cuadro de diálogo con la respuesta del servidor
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        this.volver();
        console.log('Respuesta del servidor:', response);
      },
      (error) => {
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: "ERROR DEL SERVIDOR" }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        console.error('Error al eliminar el miembro:', error);
      }
    );
  }
  activarModoEdicion() {

    this.modoVista = false;
    this.modoEdicion = true;
  }
  actualizarAmarre() {

    this.apiservice.update(this.alquilerSeleccionado.id, "alquiler", this.alquilerSeleccionado).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        // Manejar la respuesta del servidor aquí
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        console.log('Respuesta del servidor:', response);
        this.volver();
      },
      (error) => {
        // Manejar cualquier error que ocurra durante la solicitud DELETE
        console.error('Error al actualizar el alquiler:', error);
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: "Error del servidor" }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        this.volver();
        // Realizar cualquier acción adicional en caso de error, como mostrar un mensaje al usuario
      }
    );

  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('id') || '';
    this.activatedRoute.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      const ai = params['ai'];
      this.mostrarVacio = tipo === 'vacio';

      if (!this.mostrarVacio) {
        this.apiservice.getAlquiler(ai).subscribe((data: any) => {
          this.alquilerSeleccionado = data;

        });
      }

    });

    // this.apiservice.getEmbarcacionesSocio(this.userId).subscribe((data: any) => {
    //   this.embarcaciones = data;
    //   console.log(data);
    // });
    this.apiservice.getEmbarcacionesLibresSocio(this.userId).subscribe((data: any) => {
      this.embarcaciones = data;
      console.log(data);
    });



  }

  handleAmarre() {
    this.mostrarAmarres = true;

  }
  handlePlazaBase() {
    this.mostrarPlazasBase = true;

  }

  ngAfterViewInit() {
    var map = new Map('map', {
      center: [39.45945663143549, -0.31272516319975663],
      zoom: 15
    });
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);


    // marker([39.45945663143549, -0.31472516319975663]).addTo(map).bindTooltip('Tipo: Tránsito').openTooltip().addEventListener('click', () => {
    //   console.log('Nuevo marcador pulsado');
    //   this.mostrarForm = true;
    //   this.mostrarAmarres = true;
    // });



    // marker([39.45945663143549, -0.31272516319975663]).addTo(map).bindTooltip('Tipo: Plaza Base').openTooltip().addEventListener('click', () => {
    //   console.log('Marcador 1 pulsado');
    //   this.mostrarForm = true;
    //   this.mostrarPlazasBase = true;
    // });

    this.apiservice.getAmarresDisponibles().subscribe(berths => {
      berths.forEach((berth: any, index: number) => {
        const offset = 0.001 * index; // Ajusta este valor para separar los marcadores
        const coordinates: LatLngExpression = [39.45945663143549 + offset, -0.31272516319975663 + offset];
        const berthMarker = marker(coordinates).addTo(map).bindTooltip(`Tipo: ${berth.TipoPlaza}`).openTooltip();

        berthMarker.addEventListener('click', () => {
          console.log('Marcador pulsado', berth.id);
          this.amarreId = berth.id;
          this.mostrarForm = true;
          if (berth.TipoPlaza === 'Transito') {
            this.mostrarAmarres = true;
            this.mostrarPlazasBase = false;
          } else if (berth.TipoPlaza === 'Plaza Base') {
            this.mostrarAmarres = false;
            this.mostrarPlazasBase = true;
          }
        });
      }

      )
    }


    )




    // var map = L.map('map', {
    //   center: [51.505, -0.09],
    //   zoom: 13
    // });
  }
  addAmarre() {
    console.log("Añadir amarre");
    const formulario = document.forms.namedItem("amarresForm") as HTMLFormElement;
    const formData = new FormData();
    formData.append('userId', this.userId);

    formData.append('embarcacion', formulario['embarcacion'].value);
    formData.append('fechaInicio', formulario['fechaInicio'].value);
    formData.append('fechaFin', formulario['fechaFin'].value);
    formData.append('tipo', 'amarre');
    console.log(formData);
    this.apiservice.add("alquiler", formData).subscribe(
      (response) => {

        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        // Manejar la respuesta del servidor aquí
        console.log('Respuesta del servidor:', response);
        this.volver();
        // Realizar cualquier otra acción necesaria, como navegar a otra ruta
        // this.router.navigate(['/miembros']);
      },
      (error) => {
        // Manejar cualquier error que ocurra durante la solicitud POST
        console.error('Error al añadir el alquiler:', error);
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: "Error del servidor" }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        this.volver();
        // Realizar cualquier acción adicional en caso de error, como mostrar un mensaje al usuario
      }
    );

    this.apiservice.add("notificacionSocio", { "titulo": "Solicitud de alta de amarre", "mensaje": JSON.stringify({ "Embarcacion_id": formData.get("embarcacion"), "FechaInicio": formData.get("fechaInicio"), "PlazaBase_id": this.amarreId, "FechaFinalizacion": formData.get("fechaFin") }), tipo: formData.get("tipo"), "userId": this.userId }).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        // Manejar la respuesta del servidor aquí
        // this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
        //   // Realizar cualquier otra acción necesaria
        // });
        // console.log('Respuesta del servidor:', response);
        // this.volver();
      },
      (error) => {
        // Manejar cualquier error que ocurra durante la solicitud DELETE
        console.error('Error al actualizar el alquiler:', error);
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: "Error del servidor" }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        this.volver();
        // Realizar cualquier acción adicional en caso de error, como mostrar un mensaje al usuario
      }
    );

  }

  actualizarFechaMaxima() {
    if (this.fechaInicioAmarre) {
      const fechaInicio = new Date(this.fechaInicioAmarre);
      const fechaMaxima = new Date(fechaInicio);
      fechaMaxima.setMonth(fechaMaxima.getMonth() + 6);

      this.fechaMaximoFinAmarre = fechaMaxima.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    }
  }

  // updateFechaFin() {
  //   if (this.fechaInicio) {
  //     const fechaInicioDate = new Date(this.fechaInicio);
  //     fechaInicioDate.setMonth(fechaInicioDate.getMonth() + 6);
  //     this.minFechaFin = fechaInicioDate.toISOString().split('T')[0];
  //     if (new Date(this.fechaFin) < fechaInicioDate) {
  //       this.fechaFin = this.minFechaFin;
  //     }
  //   }
  // }
  updateFechaFin(inicio: any, fin: any) {
    if (inicio) {
      const fechaInicioDate = new Date(inicio);
      fechaInicioDate.setMonth(fechaInicioDate.getMonth() + 6);
      this.minFechaFin = fechaInicioDate.toISOString().split('T')[0];
      if (new Date(fin) < fechaInicioDate) {
        this.fechaFin = this.minFechaFin;
      }
    }
  }

}
