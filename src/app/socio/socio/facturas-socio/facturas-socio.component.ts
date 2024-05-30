import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturas-socio',
  templateUrl: './facturas-socio.component.html',
  styleUrls: ['./facturas-socio.component.css']
})
export class FacturasSocioComponent {
  constructor(private router: Router) { }

  volver() {
    this.router.navigate(['/panel']);
  }
}
