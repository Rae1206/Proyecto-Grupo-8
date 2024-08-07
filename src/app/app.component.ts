import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';
import { UserService } from './servicios/user.service'; // Ajusta la ruta según sea necesario
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; // Si usas botones
import { CommonModule } from '@angular/common'; 
import { combineLatest } from 'rxjs';
import { PedidoService } from './servicios/pedidoService.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponent, PiePaginaComponent, HttpClientModule
    ,MatDialogModule,MatButtonModule,CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[PedidoService]
})
export class AppComponent  {
  title = 'ProyectoGrupo8';

  constructor(private userService: UserService, private router: Router) {}

}
