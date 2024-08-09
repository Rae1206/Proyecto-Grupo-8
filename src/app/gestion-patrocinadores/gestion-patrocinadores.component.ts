import { Component, TemplateRef, ViewChild } from '@angular/core';
import { patrocinadores } from '../Interfaces/patrocinadores';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatrocinadoresService } from '../servicios/patrocinadores.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfirmarEliminacionDialogComponent } from '../confirmar-eliminacion-dialog/confirmar-eliminacion-dialog.component';

@Component({
  selector: 'app-gestion-patrocinadores',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './gestion-patrocinadores.component.html',
  styleUrl: './gestion-patrocinadores.component.css'
})
export class GestionPatrocinadoresComponent {
  sponsors: patrocinadores[] = [];
  createForm: FormGroup;
  editForm: FormGroup;
  currentEditingSponsorId: number | undefined;  

  @ViewChild('createModal') createModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;

  constructor(
    private patrocinadoresService: PatrocinadoresService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.createForm = this.fb.group({
      sponsorName: ['', Validators.required],
      websiteUrl: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      creationSponsor: [new Date(), Validators.required], // Esto establecerá la fecha y hora actuales automáticamente
      isDisabled: [false]  // Asegúrate de que esto esté bien definido según tu modelo
    });

    this.editForm = this.fb.group({
      sponsorName: ['', Validators.required],
      websiteUrl: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadSponsors();
  }

  loadSponsors(): void {
    this.patrocinadoresService.getAllSponsor().subscribe({
      next: (data) => this.sponsors = data,
      error: (err) => console.error('Error fetching sponsors:', err)
    });
  }

  openCreateModal(): void {
    this.dialog.open(this.createModal);
  }

  closeCreateModal(): void {
    this.dialog.closeAll();
  }

  createSponsor(): void {
    if (this.createForm.valid) {
      this.patrocinadoresService.createSponsor(this.createForm.value).subscribe({
        next: () => {
          this.loadSponsors();
          this.closeCreateModal();
        },
        error: (err) => console.error('Error creating sponsor:', err)
      });
    }
  }

 
  openEditModal(sponsor: patrocinadores): void {
    this.currentEditingSponsorId = sponsor.sponsorId;  // Asigna el ID del patrocinador al abrir el modal
    this.editForm.setValue({
      sponsorName: sponsor.sponsorName,  
      websiteUrl: sponsor.websiteUrl,    
      contactEmail: sponsor.contactEmail          
    });
    this.dialog.open(this.editModal);
  }
  
  closeEditModal(): void {
    this.dialog.closeAll();
  }

  updateSponsor(): void {
    if (this.editForm.valid) {
      let updatedSponsor = { ...this.editForm.value, sponsorId: this.currentEditingSponsorId };
      this.patrocinadoresService.updateSponsor(updatedSponsor).subscribe({
        next: () => {
          this.loadSponsors();
          this.closeEditModal();
        },
        error: (err) => console.error('Error updating sponsor:', err)
      });
    }
  }

  deleteSponsor(id: number): void {
    // Abre un diálogo de confirmación antes de proceder a eliminar
    const dialogRef = this.dialog.open(ConfirmarEliminacionDialogComponent);
    
    // Maneja el cierre del diálogo
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Solo procede con la eliminación si el resultado es afirmativo
        this.patrocinadoresService.deleteSponsor(id).subscribe({
          next: () => {
            console.log('Patrocinador eliminado correctamente');
            this.loadSponsors(); // Recarga la lista de patrocinadores tras eliminar uno
          },
          error: (err) => {
            console.error('Error al eliminar el patrocinador:', err);
          }
        });
      } else {
        console.log('Eliminación cancelada');
      }
    });
  }
  
  
}
