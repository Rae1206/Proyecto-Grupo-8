import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [RouterModule,RouterModule,AppComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

}
