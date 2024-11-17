import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
//?Importamos interface
import Consulta from '../interfaces/consulta.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultasService {
  //?Inyección de dependencias
  constructor(private firestore: Firestore) {}
  addConsulta(consulta: Consulta) {
    //?Referencia a la bd
    const consultaRef = collection(this.firestore, 'consultas'); //?No requiere estar generada la 'tabla'
    return addDoc(consultaRef, consulta);
  }

  //?CollectionData permite obtener los datos de la bd
  getConsultas(): Observable<Consulta[]> {
    const consultaRef = collection(this.firestore, 'consultas'); //?No requiere estar generada la 'tabla'
    //?Consulta[] hace referencia a que vamos a recibir un array de datos
    return collectionData(consultaRef, { idField: 'id' }) as Observable<
      Consulta[]
    >;
  }
}
