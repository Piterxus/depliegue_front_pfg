import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
@Component({
  selector: 'app-miembros-form',
  templateUrl: './miembros-form.component.html',
  styleUrls: ['./miembros-form.component.css']
})
export class MiembrosFormComponent implements OnInit{
  mostrarVacio: boolean = false; 
  modoVista: boolean = true; 
  modoEdicion: boolean = false;
  miembroSeleccionado: any = { }; 
  data: any; 
  userId: string = "";
  
 parentescos = ['Cónyuge', 'Otro'];
 constructor(private router: Router, private sharedDataService: SharedDataService, private activatedRoute: ActivatedRoute,private apiservice: ApiService, private dialogService: DialogService) { }
  onMostrarFormulario(tipo: string) {
    // Si el tipo es vacío, muestra el formulario vacío
    if (tipo == 'vacio') {
      this.mostrarVacio = true;
    } else {
      this.mostrarVacio = false;
    }

  }
 volver() {
    this.router.navigate(['/miembros']);
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id') || '';
   
    this.activatedRoute.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      const mi = params['mi'];
      this.mostrarVacio = tipo === 'vacio';
      this.apiservice.getFamiliar(mi).subscribe((data: any) => {
        this.miembroSeleccionado = data;
       
      });

    });

  }

  activarModoEdicion() {

    this.modoVista = false;
    this.modoEdicion = true;
  }
  addMiembro() {
    const formulario = document.forms.namedItem("formMiembros") as HTMLFormElement; 
    const formData = new FormData();
    formData.append('userId', this.userId);
    formData.append('Nombre', formulario['Nombre'].value);
    formData.append('Apellidos', formulario['Apellidos'].value);
    formData.append('FechaNacimiento', formulario['FechaNacimiento'].value);
    const edad = new Date().getFullYear() - new Date(formulario['FechaNacimiento'].value).getFullYear();
  
    formData.append('dni', formulario['dni'].value);
    const parentescoSelect = formulario['Parentesco'] as HTMLSelectElement;
    const parentescoSeleccionado = parentescoSelect.options[parentescoSelect.selectedIndex].value;
    formData.append('Parentesco', parentescoSeleccionado);
    formData.append('tipo', 'miembro');

    if (formData.get('FechaNacimiento') == ""){
      this.dialogService.mostrarMensaje({ title: 'FALTAN DATOS', message: "Por favor, rellene todos los campos." }).subscribe(() => {
        // Realizar cualquier otra acción necesaria
      });
      return;
    }

    if (edad > 18) {
      if (formData.get('Nombre') == "" || formData.get('Apellidos') == "" || formData.get('FechaNacimiento') == "" || formData.get('dni') == "" || formData.get('Parentesco') == "") {
        this.dialogService.mostrarMensaje({ title: 'FALTAN DATOS', message: "Por favor, rellene todos los campos." }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        return;
      }
    }else{
      if (formData.get('Nombre') == "" || formData.get('Apellidos') == "" || formData.get('FechaNacimiento') == "" || formData.get('Parentesco') == "") {
        this.dialogService.mostrarMensaje({ title: 'FALTAN DATOS', message: "Por favor, rellene todos los campos." }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        return;
      }
    } 
      this.apiservice.add("familiar", formData).subscribe(
        (response) => {
          this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
            // Realizar cualquier otra acción necesaria
          });
          // Manejar la respuesta del servidor aquí
         
          this.volver()
        
        },
        (error) => {
          // Manejar cualquier error que ocurra durante la solicitud POST
          console.error('Error al añadir el miembro:', error);
          this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: "Error del servidor" }).subscribe(() => {
            // Realizar cualquier otra acción necesaria
          });
          this.volver()
          // Realizar cualquier acción adicional en caso de error, como mostrar un mensaje al usuario
        }
      );
   
    this.apiservice.add("notificacionSocio", { "titulo": "Solicitud de alta de miembro", "mensaje": JSON.stringify({ "Nombre": formData.get('Nombre'), "Apellidos": formData.get('Apellidos'), "Fecha Nacimiento": formData.get('FechaNacimiento'), "DNI": formData.get('dni'), "Parentesco": formData.get('Parentesco') }), "tipo": formData.get('tipo'), "userId": this.userId }).subscribe((response) => {
      console.log('Solicitud enviada');

    },
      
        (error) => {
          // Manejar cualquier error que ocurra durante la solicitud POST
          console.error('Error al añadir el miembro:', error);
          // Realizar cualquier acción adicional en caso de error, como mostrar un mensaje al usuario
        }
      );
    

  }
  eliminarMiembro() {
   
    this.apiservice.bajaMiembro(this.miembroSeleccionado.id).subscribe(
   
      (error) => {
        //
        console.error('Error al eliminar el miembro:', error);
       
      }
    );
    this.apiservice.delete(this.miembroSeleccionado.id, "familiar").subscribe(
      (response) => {
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
       
        this.volver()
      },
      (error) => {
        // Manejar cualquier error que ocurra durante la solicitud DELETE
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: "Error del servidor" }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        console.error('Error al eliminar el miembro:', error);
        this.volver()
        // Realizar cualquier acción adicional en caso de error, como mostrar un mensaje al usuario
      }
    );

   
  }

  actualizarMiembro() {
    console.log(this.miembroSeleccionado);
    // this.apiservice.put('miembros/' + this.miembroSeleccionado.id, this.miembroSeleccionado).subscribe((data) => {
    //   this.router.navigate(['/miembros']);
    // });
  }

  

}
