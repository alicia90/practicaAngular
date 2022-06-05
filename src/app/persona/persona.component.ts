import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timeout } from 'rxjs';
//import { Persona } from 'src/persona';
import { MatTableDataSource } from '@angular/material/table';
import { PersonaService, Persona } from '../persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
})
export class PersonaComponent implements OnInit {
  form: FormGroup;
  loading = false;

  public displayedColumns = [
    'posicion',
    'nombre',
    'apellidos',
    'edad',
    'dni',
    'cumpleanios',
    'color_favorito',
    'sexo',
    'editar',
    'eliminar',
  ];
  dataSource = new MatTableDataSource<Persona>([]);
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private myService: PersonaService
  ) {
    this.form = this.fb.group({
      posicion: [null, [Validators.nullValidator]],
      nombre: [null, [Validators.minLength(3)]],
      apellidos: [null, [Validators.minLength(3)]],
      edad: [null, [Validators.min(0), Validators.max(125)]],
      dni: [null, [Validators.minLength(9), Validators.maxLength(9)]],
      cumple: [null, [Validators.nullValidator]],
      color_favorito: [null, [Validators.minLength(3)]],
      sexo: [null, [Validators.nullValidator]],
    });
  }

  ngOnInit(): void {}

  guardar() {
    console.log(this.form);
    const posicion = this.form.value.posicion;
    const nombre = this.form.value.nombre;
    const apellidos = this.form.value.apellidos;
    const edad = this.form.value.edad;
    const dni = this.form.value.dni;
    const cumple = this.form.value.cumple;
    const color_favorito = this.form.value.color_favorito;
    const sexo = this.form.value.sexo;

    if (posicion === undefined || posicion === null || posicion == '') {
      this.myService.setPersona(
        nombre,
        apellidos,
        edad,
        dni,
        cumple,
        color_favorito,
        sexo
      );
    } else {
      //TODO:editar
      this.myService.editPersona(
        posicion,
        nombre,
        apellidos,
        edad,
        dni,
        cumple,
        color_favorito,
        sexo
      );
    }

    console.log(nombre);
    console.log(apellidos);

    this.refresh();

    this.form.reset();
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      //Redireccionaremos al dashboard
      this.loading = false;
    }, 1500);
  }
  refresh() {
    this.myService.doSomething().subscribe((data: Persona[]) => {
      this.dataSource.data = data;
    });
  }

  editarPersona(element: number) {
    let personaModificar = this.myService.getPersona(element);
    if (personaModificar != undefined) {
      this.form.controls['posicion'].setValue(personaModificar.posicion);
      this.form.controls['nombre'].setValue(personaModificar.nombre);
      this.form.controls['apellidos'].setValue(personaModificar.apellidos);
      this.form.controls['edad'].setValue(personaModificar.edad);
      this.form.controls['dni'].setValue(personaModificar.dni);
      this.form.controls['cumple'].setValue(personaModificar.cumpleanios);
      this.form.controls['color_favorito'].setValue(
        personaModificar.color_favorito
      );
      this.form.controls['sexo'].setValue(personaModificar.sexo);
    }
  }

  eliminarPersona(element: number) {
    this.myService.deletePersona(element);
    this.refresh();
  }
}
