export default class InforProducto {
  precio: string;
  isAgotado: boolean;

  constructor(precio: string, isAgotado: boolean) {
    this.precio = precio;
    this.isAgotado = isAgotado;
  }
}
