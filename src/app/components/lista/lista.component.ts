import { Component, Input, OnInit } from '@angular/core';
import { IonList, IonText, IonItem, IonLabel } from '@ionic/angular/standalone';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [IonList, IonText, IonItem, IonLabel],

  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss'],
})
export class ListaComponent implements OnInit {
  //?Props
  @Input() numeros: any[] = [];
  @Input() multiplos_colors: any | object = {};

  constructor(private consultasService: ConsultasService) {}
  ngOnInit(): void {
    //?este se inciia cuando tenemos el componente cargado
    // this.consultasService.getConsultas().subscribe((consultas) => {
    //   console.log('Obteniendo de la bd');
    //   console.log(consultas);
    // });
  }
}
