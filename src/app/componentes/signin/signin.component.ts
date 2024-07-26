import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { UserService } from '../../servicios/user.service';
import { usuario } from '../../Interfaces/usuario';
import { AuthServiceService } from '../../servicios/auth-service.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserService]
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  isLoggedIn = false;
  constructor(private userService: UserService, private router: Router,private authService: AuthServiceService) { }

  
  onSubmit() {
    console.log("user", this.email, this.password);
    this.userService.login(this.email, this.password).subscribe(
      (user: usuario) => {
        console.log('User:', user);
        // Redirecciona a la página inicial
        this.authService.login(); // Actualiza el estado de autenticación
        this.router.navigate(['inicio']);
      },
      (error) => {
        console.error('Error:', error);
        // Maneja el error aquí
      }
    );
  }
}
