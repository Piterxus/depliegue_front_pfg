import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  mostrarMensaje(data: any, ancho: string = '250px'): Observable<any> {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: ancho,
      data: data // Pasar el objeto de datos completo
    });

    return dialogRef.afterClosed();
  }
}
