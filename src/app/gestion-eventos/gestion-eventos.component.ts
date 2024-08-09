import { Component, TemplateRef, ViewChild } from '@angular/core';
import { evento } from '../Interfaces/evento';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventosService } from '../servicios/eventos.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfirmarEliminacionDialogComponent } from '../confirmar-eliminacion-dialog/confirmar-eliminacion-dialog.component';

@Component({
  selector: 'app-gestion-eventos',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './gestion-eventos.component.html',
  styleUrl: './gestion-eventos.component.css'
})
export class GestionEventosComponent {
  events: evento[] = [];
  createForm: FormGroup;
  editForm: FormGroup;
  currentEditingSponsorId: number | undefined;  

  @ViewChild('createModal') createModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService,
    public dialog: MatDialog
  ) {
    this.createForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      localization: ['', Validators.required]
    });

    this.editForm = this.fb.group({
      eventName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      localization: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventosService.getAllSponsor().subscribe(events => this.events = events);
  }

  openCreateModal(): void {
    this.dialog.open(this.createModal);
  }

  closeCreateModal(): void {
    this.dialog.closeAll();
  }

  createEvent(): void {
    if (this.createForm.valid) {
      this.eventosService.createSponsor(this.createForm.value).subscribe(() => {
        this.loadEvents();
        this.closeCreateModal();
      });
    }
  }

  openEditModal(event: evento): void {
    this.currentEditingSponsorId = event.eventId;  // Asegúrate de que la variable sea correcta para eventos
  
    // Convertir startDate y endDate a Date si no son instancias de Date.
    const startDate = event.startDate instanceof Date ? event.startDate : new Date(event.startDate);
    const endDate = event.endDate instanceof Date ? event.endDate : new Date(event.endDate);
  
    this.editForm.setValue({
      eventName: event.eventName,
      description: event.description,
      startDate: startDate.toISOString().substring(0, 10), // Ajusta el formato de la fecha para el input de tipo fecha
      endDate: endDate.toISOString().substring(0, 10), // Ajusta el formato de la fecha para el input de tipo fecha
      localization: event.localization
    });
  
    this.dialog.open(this.editModal);
  }
  

  closeEditModal(): void {
    this.dialog.closeAll();
  }

  updateEvent(): void {
    if (this.editForm.valid) {
      this.eventosService.updateSponsor({...this.editForm.value, eventId: this.currentEditingSponsorId}).subscribe(() => {
        this.loadEvents();
        this.closeEditModal();
      });
    }
  }

  deleteEvent(id: number): void {
    // Abre un diálogo de confirmación antes de proceder a eliminar
    const dialogRef = this.dialog.open(ConfirmarEliminacionDialogComponent);
    
    // Maneja el cierre del diálogo
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Solo procede con la eliminación si el resultado es afirmativo
        this.eventosService.deleteSponsor(id).subscribe({
          next: () => {
            console.log('evento eliminado correctamente');
            this.loadEvents(); // Recarga la lista de patrocinadores tras eliminar uno
          },
          error: (err) => {
            console.error('Error al eliminar el evento:', err);
          }
        });
      } else {
        console.log('Eliminación cancelada');
      }
    });
  }
}
