import { Carrito } from './carrito';

export interface Pedido {
  id: number;
  carrito: Carrito;
  fechaPedido: Date;
}