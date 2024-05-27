import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';
@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [RouterModule,RouterModule,AppComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {

}
