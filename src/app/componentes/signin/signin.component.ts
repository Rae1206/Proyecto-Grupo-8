import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../servicios/user.service';
import { AuthServiceService } from '../../servicios/auth-service.service';
import { usuario } from '../../Interfaces/usuario';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private userService: UserService, private router: Router, private authService: AuthServiceService) { }

  onSubmit() {
    console.log("user", this.email, this.password);
    this.userService.login(this.email, this.password).subscribe(
      (user: usuario) => {
        console.log('User:', user);
        // Actualiza el estado de autenticación
        this.authService.login(user); // Pasar el objeto usuario
        // Redirecciona a la página inicial
        this.router.navigate(['inicio']);
      },
      (error) => {
        console.error('Error:', error);
        // Maneja el error aquí
      }
    );
  }
}
