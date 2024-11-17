import { ConsultasService } from './services/consultas.service';
//?Archivo fuente
import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonItem,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone'; // Importa IonicModule

import { FormsModule } from '@angular/forms'; // Importa FormsModule

import { ListaComponent } from './components/lista/lista.component';
import Consulta from './interfaces/consulta.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    FormsModule,
    IonCol,
    IonText,
    IonItem,
    IonButton,
    IonInput,
    ListaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private consultasService: ConsultasService) {}
  //?Variables globales
  numIngresado: any | number = null;
  numeros: any[] = [];
  multiplos_colors: any | object = {};
  val_mayor_cero: boolean = false;
  val_vacio: boolean = false;
  estatus: boolean = false;

  //?Funciones
  //?Esta funcion se encarga de evaluar si un numero es multiplo de 3, 5 o 7

  async encuentraMultiplos() {
    let numeros = [];
    this.val_mayor_cero = false;
    this.val_vacio = false;
    if (this.numIngresado != null) {
      for (let i = 0; i <= this.numIngresado; i++) {
        let num = {
          num: 0,
          verde: false,
          rojo: false,
          azul: false,
          negro: false,
        };
        num.num = i;

        num.verde = this.multiplos(i, 3);
        //?Se evalua si ya tienen un multiplo menor
        num.rojo = this.multiplos(i, 5);
        num.azul = this.multiplos(i, 7);
        num.negro =
          num.verde === false && num.rojo === false && num.azul === false
            ? true
            : false;

        numeros.push(num);
      }
      this.numeros = await numeros;
      this.multiplosColor();

      this.guardarDB();
      this.val_mayor_cero = true;
    } else {
      this.val_vacio = true;
    }
  }
  //?Esta funcion se encarga de evaluar si un numero es multiplo
  multiplos(n1: number, n2: number) {
    if (n1 % n2 === 0 && n1 != 0) {
      return true;
    } else {
      return false;
    }
  }
  //?Separa los multiplos de 3, 5 y 7
  multiplosColor() {
    const verde = this.numeros
      .filter((num) => num.verde === true)
      .map((num) => num.num);

    const rojo = this.numeros
      .filter((num) => num.rojo === true)
      .map((num) => num.num);
    const azul = this.numeros
      .filter((num) => num.azul === true)
      .map((num) => num.num);
    this.multiplos_colors = {
      verde,
      rojo,
      azul,
    };
  }

  async guardarDB() {
    this.estatus = true;
    const consulta: Consulta = {
      num: this.numIngresado,
      numeros: this.numeros,
      multiplos_colors: this.multiplos_colors,
    };
    const { id } = await this.consultasService.addConsulta(consulta);
    if (id !== undefined || id !== null) {
      this.estatus = false;
    }
  }
}
