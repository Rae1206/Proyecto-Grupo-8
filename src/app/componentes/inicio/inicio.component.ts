import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule,RouterModule,AppComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
