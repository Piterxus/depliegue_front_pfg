import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { catchError } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';


@Component({
  selector: 'app-embarcaciones-socio-form',
  templateUrl: './embarcaciones-socio-form.component.html',
  styleUrls: ['./embarcaciones-socio-form.component.css']
})
export class EmbarcacionesSocioFormComponent implements OnInit {


  mostrarVacio: boolean = false;
  modoVista: boolean = true;
  modoEdicion: boolean = false;
  embarcacionSeleccionada: any = {};
  data: any;
  userId: string = "";
  tipos = ['Tabla de surf con motor', 'Windsurf', 'SUP', 'Piragua', 'Kayak', 'Canoa', 'Patín', 'Bote', 'Moto', 'Barca hinchable', 'Barco de pesca', 'Barco de vela ligera', 'Lancha', 'Velero', 'Catamarán', 'Yate', 'SuperYate']
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
    this.router.navigate(['/embarcaciones-socio']);
  }

  eliminarEmbarcacion() {
    this.apiservice.delete(this.embarcacionSeleccionada.id, "embarcacion").subscribe(
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
        this.volver();
        console.error('Error al eliminar la embarcación:', error);
      }
    );
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id') || '';
    console.log("User", this.userId);
    this.activatedRoute.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      const ai = params['ai'];
      this.mostrarVacio = tipo === 'vacio';
      if (!this.mostrarVacio){
        this.apiservice.getEmbarcacionId(ai).subscribe((data: any) => {
          this.embarcacionSeleccionada = data;
          console.log('EMBARCACIÓN: ', this.embarcacionSeleccionada);
        });
      }

    });

  }

  activarModoEdicion() {

    this.modoVista = false;
    this.modoEdicion = true;
  }

  addEmbarcacion() {
    const formulario = document.forms.namedItem("formEmbarcacion") as HTMLFormElement;
    const formData = new FormData();
    formData.append('Titular', this.userId);
    formData.append('Matricula', formulario['Matricula'].value);
    formData.append('Manga', formulario['Manga'].value);
    formData.append('Eslora', formulario['Eslora'].value);
    formData.append('Origen', formulario['Origen'].value);
    formData.append('Numero_registro', formulario['Numero_registro'].value);
    formData.append('Datos_tecnicos', formulario['Datos_tecnicos'].value);
    formData.append('Modelo', formulario['Modelo'].value);
    formData.append('Nombre', formulario['Nombre'].value);
    formData.append('Tipo', formulario['Tipo'].value);
    console.log("Fuckin Formulario", formData);
    this.apiservice.add("embarcacion", formData).subscribe(
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
    this.apiservice.add("notificacionSocio", { "titulo": "Solicitud de alta embarcación", "mensaje": JSON.stringify({ "Matricula": formData.get("Matricula"), "Manga": formData.get("Manga"), "Eslora": formData.get("Eslora"), "Origen": formData.get("Origen"), "Titular": formData.get("Titular"), "Numero_registro": formData.get("Numero_registro"), "Datos_tecnicos": formData.get("Datos_tecnicos"), "Modelo": formData.get("Modelo"), "Nombre": formData.get("Nombre"), "Tipo": formData.get("Tipo")  }), tipo: "embarcacion", "userId": this.userId }).subscribe(
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

  actualizarEmbarcacion() {


    this.apiservice.update(this.embarcacionSeleccionada.id, "embarcacion", this.embarcacionSeleccionada).subscribe(
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


  
}
