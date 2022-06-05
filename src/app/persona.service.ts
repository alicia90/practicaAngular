import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class PersonaService {
  persList: Array<Persona> = [];
  doSomething(): Observable<Persona[]> {
    let personas = this.getPersonas();
    return of(personas);
  }
  private getPersonas(): Persona[] {
    return this.persList;
  }

  public setPersona(
    _nombre: string,
    _apellidos: string,
    _edad: string,
    _dni: string,
    _cumple: Date,
    _color_favorito: string,
    _sexo: string
  ) {
    let posicion = this.persList.length + 1;
    let personaObj: Persona = {
      posicion: posicion,
      nombre: _nombre,
      apellidos: _apellidos,
      edad: _edad,
      dni: _dni,
      cumpleanios: _cumple,
      color_favorito: _color_favorito,
      sexo: _sexo,
    };

    this.persList.push(personaObj);

    return this.persList;
  }

  public getPersona(posicion: number): Persona | undefined {
    let personaModificar = this.persList.find((x) => x.posicion == posicion);

    return personaModificar;
  }

  public editPersona(
    posicion: number,
    _nombre: string,
    _apellidos: string,
    _edad: string,
    _dni: string,
    _cumple: Date,
    _color_favorito: string,
    _sexo: string
  ) {
    let personaModificar = this.getPersona(posicion);
    if (personaModificar != undefined) {

      personaModificar.nombre = _nombre;
      personaModificar.apellidos = _apellidos;
      personaModificar.edad = _edad;
      personaModificar.dni = _dni;
      personaModificar.cumpleanios = _cumple;
      personaModificar.color_favorito = _color_favorito;
      personaModificar.sexo = _sexo;

      const indexOfObject = this.persList.findIndex((object) => {
        return object.posicion === posicion;
      });

      this.persList[indexOfObject] = personaModificar;

    }
  }

  public deletePersona(posicion: number) {
    const indexOfObject = this.persList.findIndex((object) => {
      return object.posicion === posicion;
    });

    if (indexOfObject !== -1) {
      this.persList.splice(indexOfObject, 1);
    }
  }
}

export interface Persona {
  posicion: number;
  nombre: string;
  apellidos: string;
  edad: string;
  dni: string;
  cumpleanios: Date;
  color_favorito: string;
  sexo: string;
}
