import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
@Component({
  selector: 'app-perfil-socio',
  templateUrl: './perfil-socio.component.html',
  styleUrls: ['./perfil-socio.component.css']
})
export class PerfilSocioComponent implements OnInit {
  userId: string = "";
  user: any = {};
  confirmPassword = '';
  constructor(private apiService: ApiService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id') || '';
    this.apiService.getUserInfo(this.userId).subscribe(
      (data: any) => {
        this.user = data;

      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  updateUser() {

    this.apiService.update(this.userId, 'usuario', this.user).subscribe(
      (response) => {
        this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });

      },
      (error) => {
        console.log('error', error);
      }
    );
  }

}
