import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthServiceService } from '../../servicios/auth-service.service';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [AppComponent,RouterOutlet,RouterModule,CommonModule],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css'
})
export class CabeceraComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthServiceService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}

