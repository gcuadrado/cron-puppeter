export default class InforProducto {
  precio: string;
  isAgotado: boolean;
  modelName: string;

  constructor(modelName: string, precio: string, isAgotado: boolean) {
    this.precio = precio;
    this.isAgotado = isAgotado;
    this.modelName = modelName;
  }
}
