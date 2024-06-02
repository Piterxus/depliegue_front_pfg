import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
@Component({
  selector: 'app-facturas-detalle',
  templateUrl: './facturas-detalle.component.html',
  styleUrls: ['./facturas-detalle.component.css']
})
export class FacturasDetalleComponent implements OnInit{
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }
  userInfo: any;
  facturaSeleccionada : any;
  facturaDetalle : any;
  lineasFactura : any;

  

  ngOnInit(): void {
    
    this.getUserData(); // Llama al método para obtener la información del usuario al iniciar el componente
    // Obtener los parámetros de la URL
    this.route.queryParams.subscribe(params => {
      const facturaId = params['id'];
      // Llamar al método para obtener la información de la factura
      this.getFacturaDetalle(facturaId);
      // Llamar al método para obtener las líneas de la factura
      this.getLineasFactura(facturaId);
    });

  }

  getUserData(): void {
    const userId = localStorage.getItem('id'); // Obtén el ID del usuario de localStorage
    if (userId) {
      this.apiService.getUserInfo(userId).subscribe(
        (data) => {
          this.userInfo = data; // Asigna los datos del usuario a la variable userInfo
         
        },
        (error) => {
          console.error('Error al obtener la información del usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el ID del usuario en localStorage');
    }
  }
  getFacturaDetalle(facturaId: any): void {
    // Obtener la información de la factura utilizando su ID
    this.apiService.getFacturaID(facturaId).subscribe(
      (data) => {
        this.facturaDetalle = data; // Asignar los datos recibidos a la variable
       
      },
      (error) => {
        console.error('Error al obtener el detalle de la factura:', error);
      }
    );
  }

  getLineasFactura(facturaId: any): void {
    // Obtener las líneas de la factura utilizando su ID
    this.apiService.getLineasFactura(facturaId).subscribe(
      (data) => {
        this.lineasFactura = data; // Asignar los datos recibidos a la variable
       
      },
      (error) => {
        console.error('Error al obtener el detalle de la factura:', error);
      }
    );
  }

}
