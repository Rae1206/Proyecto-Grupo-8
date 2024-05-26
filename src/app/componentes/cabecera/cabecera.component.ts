import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [AppComponent,RouterOutlet,RouterModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent {

}
