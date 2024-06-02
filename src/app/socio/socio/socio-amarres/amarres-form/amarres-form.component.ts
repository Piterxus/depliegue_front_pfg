import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Map, tileLayer, marker, LatLngExpression } from 'leaflet';



@Component({
  selector: 'app-amarres-form',
  templateUrl: './amarres-form.component.html',
  styleUrls: ['./amarres-form.component.css']
})
export class AmarresFormComponent implements OnInit {
  mostrarVacio: boolean = false;
  modoVista: boolean = true;
  modoEdicion: boolean = false;
  // alquilerSeleccionado: any = { datos_tecnicos: '' };
  alquilerSeleccionado: any = {  };
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
    this.apiservice.bajaAlquiler(this.alquilerSeleccionado.id).subscribe((error) => {
      console.error('Error al eliminar el alquiler:', error);
    });


    this.apiservice.delete(this.alquilerSeleccionado.id, "alquiler").subscribe(
      (response) => {
        // Mostrar el cuadro de diálogo con la respuesta del servidor
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {

        });
        this.volver();

      },
      (error) => {
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: "ERROR DEL SERVIDOR" }).subscribe(() => {

        });
        console.error('Error al eliminar el alquiler:', error);
      }
    );
  }
  activarModoEdicion() {

    this.modoVista = false;
    this.modoEdicion = true;
  }
  actualizarAmarre() {

    const regimen = this.activatedRoute.snapshot.queryParams['rg'];
    const ai = this.activatedRoute.snapshot.queryParams['ai'];

    if (regimen === 'alquiler') {
      this.apiservice.update(this.alquilerSeleccionado.id, "alquiler", this.alquilerSeleccionado).subscribe(
        (response) => {

          this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
            // Realizar cualquier otra acción necesaria
          });

          this.volver();
        },
        (error) => {

          console.error('Error al actualizar el alquiler:', error);
          this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: "Error del servidor" }).subscribe(() => {
            // Realizar cualquier otra acción necesaria
          });
          this.volver();
          // Realizar cualquier acción adicional en caso de error, como mostrar un mensaje al usuario
        }
      );
    }

    if (regimen === 'transito') {
  
      this.apiservice.updateTransitoSolicitado(ai, this.alquilerSeleccionado).subscribe(
        (response) => {

          this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
            // Realizar cualquier otra acción necesaria
          });

          this.volver();
        },
        (error) => {

          console.error('Error al actualizar el alquiler:', error);
          this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: "Error del servidor" }).subscribe(() => {
            // Realizar cualquier otra acción necesaria
          });
          this.volver();
          // Realizar cualquier acción adicional en caso de error, como mostrar un mensaje al usuario
        }
      );

    }

  }
  ngOnInit(): void {
    this.userId = localStorage.getItem('id') || '';
    this.activatedRoute.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      const ai = params['ai'];
      const rg = params['rg'];
      this.mostrarVacio = tipo === 'vacio';

      if (!this.mostrarVacio) {
        if (rg === 'alquiler') {
          this.apiservice.getAlquiler(ai).subscribe((data: any) => {
            this.alquilerSeleccionado = data;

          });
        }
        if (rg === 'transito'){
          this.apiservice.transitoSolicitar(ai).subscribe((data: any) => {
            this.alquilerSeleccionado.FechaInicio = data[0].FechaEntrada;
            this.alquilerSeleccionado.FechaFinalizacion = data[0].FechaSalida;
            this.actualizarFechaMaxima();
          
          });
           
        }

      }

    });


    this.apiservice.getEmbarcacionesLibresSocio(this.userId).subscribe((data: any) => {
      this.embarcaciones = data;

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




    this.apiservice.getAmarresDisponibles().subscribe(berths => {
      berths.forEach((berth: any, index: number) => {
        const offset = 0.001 * index; // Ajusta este valor para separar los marcadores
        const coordinates: LatLngExpression = [39.45945663143549 + offset, -0.31272516319975663 + offset];
        const berthMarker = marker(coordinates).addTo(map).bindTooltip(`Tipo: ${berth.TipoPlaza}`).openTooltip();

        berthMarker.addEventListener('click', () => {

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





  }
  addAmarre() {

    const formulario = document.forms.namedItem("amarresForm") as HTMLFormElement;
    const formData = new FormData();
    formData.append('userId', this.userId);

    formData.append('embarcacion', formulario['embarcacion'].value);
    formData.append('fechaInicio', formulario['fechaInicio'].value);
    formData.append('fechaFin', formulario['fechaFin'].value);
    formData.append('tipo', 'amarre');

    this.apiservice.add("alquiler", formData).subscribe(
      (response) => {

        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        // Manejar la respuesta del servidor aquí

        this.volver();

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

    this.apiservice.add("notificacionSocio", { "titulo": "Solicitud de alta de amarre", "mensaje": JSON.stringify({ "Embarcacion_id": formData.get("embarcacion"), "FechaInicio": formData.get("fechaInicio"), "PlazaBase_id": this.amarreId, "FechaFinalizacion": formData.get("fechaFin") }), tipo: formData.get("tipo"), "userId": this.userId }).subscribe((response) => {
      console.log('Solicitud enviada');

    },

      (error) => {

        console.error('Error al actualizar el alquiler:', error);
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: "Error del servidor" }).subscribe(() => {

        });
        this.volver();

      }
    );

  }

  // actualizarFechaMaxima() {
  //   if (this.fechaInicioAmarre) {
  //     const fechaInicio = new Date(this.fechaInicioAmarre);
  //     const fechaMaxima = new Date(fechaInicio);
  //     fechaMaxima.setMonth(fechaMaxima.getMonth() + 6);

  //     this.fechaMaximoFinAmarre = fechaMaxima.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
  //   }
  // }

  actualizarFechaMaxima() {
    if (this.alquilerSeleccionado.FechaInicio) {
      const fechaInicio = new Date(this.alquilerSeleccionado.FechaInicio);
      const fechaMaxima = new Date(fechaInicio);
      fechaMaxima.setMonth(fechaMaxima.getMonth() + 6);
      this.fechaMaximoFinAmarre = fechaMaxima.toISOString().split('T')[0];
    }
  }

  // updateFechaFin(inicio: any, fin: any) {
  //   if (inicio) {
  //     const fechaInicioDate = new Date(inicio);
  //     fechaInicioDate.setMonth(fechaInicioDate.getMonth() + 6);
  //     this.minFechaFin = fechaInicioDate.toISOString().split('T')[0];
  //     if (new Date(fin) < fechaInicioDate) {
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
        this.alquilerSeleccionado.FechaFinalizacion = this.minFechaFin;
      }
      this.actualizarFechaMaxima();
    }
  }

}
