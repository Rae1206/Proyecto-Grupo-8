import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../servicios/user.service';
import { AuthServiceService } from '../../servicios/auth-service.service';
import { usuario } from '../../Interfaces/usuario';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule,RouterModule,AppComponent, FormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  lastName: string = '';
  dateOfBirth: Date = new Date(); // Cambiado a Date | null
  gender : string = '';

  title = 'ProyectoGrupo8';

  onSubmit() {
    console.log("user", this.email, this.password, this.dateOfBirth);
    this.userService.register(this.email, this.password,this.name,this.lastName,this.dateOfBirth,this.gender).subscribe(
      (user: usuario) => {
        console.log('User:', user);
        // Redirecciona a la página inicial
        this.router.navigate(['inicio']);
      },
      (error) => {
        console.error('Error:', error);
        // Maneja el error aquí
      }
    );
  }

  constructor(private userService: UserService, private router: Router,private authService: AuthServiceService) {
   
  }

  
}
