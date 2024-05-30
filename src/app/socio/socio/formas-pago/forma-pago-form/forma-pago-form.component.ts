import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { map } from 'rxjs/operators';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-forma-pago-form',
  templateUrl: './forma-pago-form.component.html',
  styleUrls: ['./forma-pago-form.component.css']
})
export class FormaPagoFormComponent implements OnInit {
  tipo: string = '';
  @Output() volver: EventEmitter<void> = new EventEmitter<void>();
  data: any = {};
  userId: string = '';
  cuenta: any = {};
  newCuenta: any = { Banco: '', Numero: '', IBAN: '', expira: '', CVV: '' };
  ibanLengths: { [countryCode: string]: number } = {
    'AL': 28, 'AD': 24, 'AT': 20, 'AZ': 28, 'BH': 22, 'BE': 16,
    'BA': 20, 'BR': 29, 'BG': 22, 'CR': 22, 'HR': 21, 'CY': 28,
    'CZ': 24, 'DK': 18, 'DO': 28, 'EE': 20, 'FO': 18, 'FI': 18,
    'FR': 27, 'GE': 22, 'DE': 22, 'GI': 23, 'GR': 27, 'GL': 18,
    'GT': 28, 'HU': 28, 'IS': 26, 'IE': 22, 'IL': 23, 'IT': 27,
    'JO': 30, 'KZ': 20, 'XK': 20, 'KW': 30, 'LV': 21, 'LB': 28,
    'LI': 21, 'LT': 20, 'LU': 20, 'MK': 19, 'MT': 31, 'MR': 27,
    'MU': 30, 'MD': 24, 'MC': 27, 'ME': 22, 'NL': 18, 'NO': 15,
    'PK': 24, 'PS': 29, 'PL': 28, 'PT': 25, 'QA': 29, 'RO': 24,
    'SM': 27, 'SA': 24, 'RS': 22, 'SK': 24, 'SI': 19, 'ES': 24,
    'SE': 24, 'CH': 21, 'TN': 24, 'TR': 26, 'UA': 29, 'AE': 23,
    'GB': 22, 'VG': 24
  };
  // @Output() volver = new EventEmitter<boolean>();

  constructor(private apiservice: ApiService, private dialogService: DialogService, private _location: Location) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id') || '';
    this.apiservice.getAll('metodopago').pipe(
      map((data: any) => {
        this.data = data;
        this.cuenta = this.data.find((element: any) => {
          console.log('Comparando', element.titular, 'con', parseInt(this.userId));
          return element.titular === parseInt(this.userId);
        });
        console.log('cuenta', this.cuenta);
        if (this.cuenta) {

        } else {
          console.log('no tiene cuenta');
        }
      })
    ).subscribe(
      (data: any) => {
        console.log('data', data);
      },
      (error) => {
        console.log('error', error);
      }
    );

  }

  addTarjeta() {
    this.tipo = 'tarjeta';
  }
  addCuenta() {
    this.tipo = 'cuenta';
  }
  isValidIBAN(iban: string): boolean {
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
    if (!ibanRegex.test(iban)) {
      return false;
    }

    const countryCode = iban.slice(0, 2);
    const expectedLength = this.ibanLengths[countryCode];
    if (!expectedLength || iban.length !== expectedLength) {
      return false;
    }

    const rearranged = iban.slice(4) + iban.slice(0, 4);
    const numericIBAN = rearranged.split('').map(char => {
      const code = char.charCodeAt(0);
      return code >= 65 && code <= 90 ? code - 55 : char;
    }).join('');

    let mod97 = BigInt(numericIBAN) % BigInt(97);
    return mod97 === BigInt(1);
  }
  isValidCreditCardNumber(cardNumber: string): boolean {
    // Eliminar espacios y guiones
    const sanitizedCardNumber = cardNumber.replace(/[\s-]/g, '');

    // Verificar que sea un número y tenga entre 13 y 19 dígitos
    const cardNumberRegex = /^\d{13,19}$/;
    if (!cardNumberRegex.test(sanitizedCardNumber)) {
      return false;
    }

    // Implementación del algoritmo de Luhn
    let sum = 0;
    let shouldDouble = false;

    // Iterar de derecha a izquierda
    for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitizedCardNumber.charAt(i), 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    // El número es válido si la suma es múltiplo de 10
    return sum % 10 === 0;
  }

  validarCVV(cvv: string): boolean {
    // Eliminar cualquier espacio en blanco
    cvv = cvv.trim();

    // Verificar si el CVV tiene 3 o 4 dígitos y son numéricos
    const cvvRegex: RegExp = /^\d{3,4}$/;
    return cvvRegex.test(cvv);
}

  updateCuenta() {
    console.log('cuenta', this.newCuenta);
    if (this.tipo === 'tarjeta') {
      if (this.newCuenta.Numero === '' || this.newCuenta.expira === '' || this.newCuenta.CVV === '') {
        this.dialogService.mostrarMensaje({ title: 'Error', message: 'Faltan datos' }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        return;
      }
      if (!this.isValidCreditCardNumber(this.newCuenta.Numero)) {
        this.dialogService.mostrarMensaje({ title: 'Error', message: 'Número de tarjeta no válido' }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        return;
      } 
      if (!this.validarCVV(this.newCuenta.CVV)) {
        this.dialogService.mostrarMensaje({ title: 'Error', message: 'CVV no válido' }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        return;
      }
      this.newCuenta.Banco = null;
      this.newCuenta.IBAN = null;
      this.apiservice.update(this.cuenta.id, 'metodopago', this.newCuenta).subscribe(
        (response) => {
          this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
            // Realizar cualquier otra acción necesaria
          });
          console.log('data', response);
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
    if (this.tipo === 'cuenta') {

      if (this.newCuenta.Banco === '' || this.newCuenta.IBAN === '') {
        this.dialogService.mostrarMensaje({ title: 'Error', message: 'Faltan datos' }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        return;
      }
      if (!this.isValidIBAN(this.newCuenta.IBAN)) {
        this.dialogService.mostrarMensaje({ title: 'Error', message: 'IBAN no válido' }).subscribe(() => {
          // Realizar cualquier otra acción necesaria
        });
        return;
      } 
      this.newCuenta.Numero = null;
      this.newCuenta.expira = null;
      this.apiservice.update(this.cuenta.id, 'metodopago', this.newCuenta).subscribe(
        (response) => {
          this.dialogService.mostrarMensaje({ title: 'Respuesta del servidor', message: response.message }).subscribe(() => {
            // Realizar cualquier otra acción necesaria
          });
          console.log('data', response);
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
  }
  volverATablas() {
    this._location.back();
  }
}
