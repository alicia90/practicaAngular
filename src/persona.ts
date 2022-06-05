export class Persona {
  private nombre: string;
  private apellidos: string;
  private edad: number | string;
  private dni: string;
  private cumpleanios: Date;
 // private colorFavorito: enumColorFavorito;

  constructor(
    _nombre: string,
    _apellidos: string,
    _edad: number | string,
    _dni: string,
    _cumpleanios: Date
  ) {
    this.nombre = _nombre;
    this.apellidos = _apellidos;
    this.edad = _edad;
    this.dni = _dni;
    this.cumpleanios = _cumpleanios;
    //this.colorFavorito = _colorFavorito;
  }
  set setNombre(a: string) {
    this.nombre = a;
  }
  set setAellidos(b: string) {
    this.apellidos = b;
  }
  set setEdad(c: number | string) {
    this.edad = c;
  }
  set setDni(d: string) {
    this.dni = d;
  }
  set setCumpleanios(e: Date) {
    this.cumpleanios = e;
  }

  public get getNombre(): string {
    return this.nombre;
  }
  public get getApellidos(): string {
    return this.apellidos;
  }
  public get getEdad(): number | string {
    return this.edad;
  }

  public get getDni(): string {
    return this.dni;
  }

  public get getCumpleanios(): string {
    let day: number = this.cumpleanios.getDate();
    let month: number = this.cumpleanios.getMonth() + 1;
    let year: number = this.cumpleanios.getFullYear();
    if (month < 10) return day + '/' + '0' + month + '/' + year;
    else return day + '/' + month + '/' + year;
  }

 // public get getColorFavorito(): string {
   // return this.colorFavorito;
  //}

  public mostrarDatos(): void {
    console.log('Nombre: ' + this.getNombre);
    console.log('Apellidos: ' + this.getApellidos);
    console.log('Edad: ' + this.getEdad);
    console.log('DNI: ' + this.getDni);
    console.log('Su cumpleanios es: ' + this.getCumpleanios);
  //  console.log('Su color favorito es: ' + this.colorFavorito);
  }

  private getNombreCompleto(): string {
    return this.nombre + ' ' + this.apellidos;
  }
}
