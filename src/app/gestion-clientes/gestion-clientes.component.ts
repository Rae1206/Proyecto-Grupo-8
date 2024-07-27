import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { usuario } from '../Interfaces/usuario';
import { UserService } from '../servicios/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminacionDialogComponent } from '../confirmar-eliminacion-dialog/confirmar-eliminacion-dialog.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.css']
})
export class GestionClientesComponent implements OnInit {
  users: usuario[] = [];
  selectedUser: usuario = {
    id: null,
    name: '',
    lastName: '',
    email: '',
    gender: '',
    role: '',
    password : '',
    dateOfBirth: new Date(),
    isDisable: false
  };

  @ViewChild('editModal') editModal!: TemplateRef<any>;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllClients().subscribe(
      (data: usuario[]) => {
        this.users = data.map(user => ({
          ...user,
          dateOfBirth: new Date(user.dateOfBirth)
        }));
        console.log('usuarios:', this.users);
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  openEditModal(user: usuario): void {
    this.selectedUser = {
      ...user,
      dateOfBirth: new Date(user.dateOfBirth)
    };
    this.dialog.open(this.editModal);
  }

  closeEditModal(): void {
    this.dialog.closeAll();
  }

  updateDateOfBirth(event: any): void {
    const value = event.target.value;
    const [year, month, day] = value.split('-').map((num: string) => parseInt(num, 10)); // Especifica el tipo 'string' para 'num'
    this.selectedUser.dateOfBirth = new Date(year, month - 1, day);
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  updateUser(): void {
    if (this.selectedUser.id === null) {
      console.error('ID no válido');
      return;
    }

    this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(
      (updatedUser: usuario) => {
        this.loadUsers();
        this.closeEditModal();
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
  
  deleteUser(id: number | null): void {
    if (id === null) {
        console.error('ID no válido');
        return;
    }

    const dialogRef = this.dialog.open(ConfirmarEliminacionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            console.log('Eliminar usuario con ID:', id);
            this.userService.deleteUser(id).subscribe(
                () => {
                    console.log('Usuario eliminado correctamente');
                    this.loadUsers();
                },
                error => {
                    console.error('Error al eliminar el usuario:', error);
                }
            );
        } else {
            console.log('Eliminación cancelada');
        }
    });
  }
}
