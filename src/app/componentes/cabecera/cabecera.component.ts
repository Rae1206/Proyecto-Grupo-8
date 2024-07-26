import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthServiceService } from '../../servicios/auth-service.service';
import { usuario } from '../../Interfaces/usuario';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: usuario | null = null; // Cambiado a 'usuario | null' para manejar el caso donde no hay usuario

  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
