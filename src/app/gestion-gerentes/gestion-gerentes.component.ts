import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { usuario } from '../Interfaces/usuario';
import { UserService } from '../servicios/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarEliminacionDialogComponent } from '../confirmar-eliminacion-dialog/confirmar-eliminacion-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-gerentes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './gestion-gerentes.component.html',
  styleUrls: ['./gestion-gerentes.component.css']
})
export class GestionGerentesComponent implements OnInit {
  gerentes: usuario[] = [];
  selectedGerente: usuario = {
    id: null,
    name: '',
    lastName: '',
    email: '',
    gender: '',
    password: '',
    role: '',
    dateOfBirth: new Date(),
    isDisable: false
  };
  newGerente: usuario = {
    id: null,
    name: '',
    lastName: '',
    email: '',
    gender: '',
    password:'',
    role: 'Gerente',
    dateOfBirth: new Date(),
    isDisable: false
  };

  @ViewChild('editModal') editModal!: TemplateRef<any>;
  @ViewChild('createModal') createModal!: TemplateRef<any>;

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadGerentes();
  }

  loadGerentes(): void {
    this.userService.getAllManagers().subscribe(
      (data: usuario[]) => {
        this.gerentes = data.map(gerente => ({
          ...gerente,
          dateOfBirth: new Date(gerente.dateOfBirth)
        }));
        console.log('gerentes:', this.gerentes);
      },
      (error) => {
        console.error('Error fetching gerentes:', error);
      }
    );
  }

  openEditModal(gerente: usuario): void {
    this.selectedGerente = { ...gerente, dateOfBirth: new Date(gerente.dateOfBirth) };
    this.dialog.open(this.editModal);
  }

  closeEditModal(): void {
    this.dialog.closeAll();
  }

  openCreateModal(): void {
    this.newGerente = {
      id: null,
      name: '',
      lastName: '',
      email: '',
      gender: '',
      password: '',
      role: 'Gerente',
      dateOfBirth: new Date(),
      isDisable: false
    };
    this.dialog.open(this.createModal);
  }

  closeCreateModal(): void {
    this.dialog.closeAll();
  }

  updateGerente(): void {
    if (this.selectedGerente.id === null) {
      console.error('ID no válido');
      return;
    }

    this.userService.updateManger(this.selectedGerente.id, this.selectedGerente).subscribe(
      () => {
        this.loadGerentes(); // Recargar la lista de gerentes
        this.closeEditModal();
      },
      (error) => {
        console.error('Error updating gerente:', error);
      }
    );
  }

  deleteGerente(id: number | null): void {
    if (id === null) {
      console.error('ID no válido');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmarEliminacionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(id).subscribe(
          () => {
            console.log('Gerente eliminado correctamente');
            this.loadGerentes(); // Recargar la lista de gerentes
          },
          error => {
            console.error('Error al eliminar el gerente:', error);
          }
        );
      } else {
        console.log('Eliminación cancelada');
      }
    });
  }

  createGerente(): void {
    this.userService.createManager(this.newGerente).subscribe(
      () => {
        this.loadGerentes(); // Recargar la lista de gerentes
        this.closeCreateModal();
      },
      (error) => {
        console.error('Error creating gerente:', error);
      }
    );
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  updateDateOfBirth(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.value) {
      const [year, month, day] = input.value.split('-').map(num => parseInt(num, 10));
      this.selectedGerente.dateOfBirth = new Date(year, month - 1, day);
    }
  }
}
