import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../servicios/pedidoService.service';
import { Pedido } from '../../Interfaces/pedido';
import { CommonModule } from '@angular/common'; 
@Component({
  standalone :true,
  selector: 'app-gestionCarrito',
  templateUrl: './gestionCarrito.component.html',
  styleUrls: ['./gestionCarrito.component.css'],
  imports:[CommonModule]
})
export class GestionCarritoComponent implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.obtenerPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
  }

}
