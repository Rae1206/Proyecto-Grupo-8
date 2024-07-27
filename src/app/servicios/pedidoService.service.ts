// src/app/services/pedido.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pedido } from '../Interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor() { }

  obtenerPedidos(): Observable<Pedido[]> {
    // Aquí deberías hacer la llamada HTTP a tu API para obtener los pedidos
    const pedidos: Pedido[] = [
      {
        id: 1,
        carrito: {
          id: 1,
          usuarioId: 1,
          productos: [
            { id: 1, nombre: 'Laptop', precio: 1000, cantidad: 1 },
            { id: 2, nombre: 'Mouse', precio: 50, cantidad: 2 }
          ],
          estado: 'enviado'
        },
        fechaPedido: new Date()
      }
    ];
    return of(pedidos);
  }
}
