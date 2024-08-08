import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { sucursales } from '../Interfaces/sucursale';
import { SucursalesService } from '../servicios/sucursales.service';
import { ConfirmarEliminacionDialogComponent } from '../confirmar-eliminacion-dialog/confirmar-eliminacion-dialog.component';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-sucursales',
  templateUrl: './gestion-sucursales.component.html',
  styleUrls: ['./gestion-sucursales.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule, FormsModule],
  providers: [DatePipe] 
})
export class GestionSucursalesComponent {
  sucursales: sucursales[] = [];
  selectedSucursales: sucursales;
  searchText: string = '';
  selectedPopularity: number | null = null;
  newSucursales: sucursales;
  editForm: FormGroup;  // Asegúrate de que está declarado
  createForm : FormGroup;
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  @ViewChild('createModal') createModal!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private sucursalesService: SucursalesService,
    public dialog: MatDialog
  ) {
    this.createForm = this.fb.group({
      name: [''],
      address: [''],
      popularity: [''],
      branchId: [''],
      creationBranch: ['']
    });
    this.editForm = this.fb.group({
      name: [''],
      address: [''],
      popularity: [''],
      branchId: [''],
      creationBranch: ['']
    });

    this.newSucursales = this.initEmptySucursales();
    this.selectedSucursales = this.initEmptySucursales();
  }

  ngOnInit(): void {
    this.loadSucursales();
  }

  initEmptySucursales(): sucursales {
    return {
      branchId: null,
      name: '',
      address: '',
      creationBranch: new Date(),
      popularity: 0,
      isDisable: false
    };
  }

  loadSucursales(): void {
    this.sucursalesService.getAllSucursales().subscribe(
      (data: sucursales[]) => this.sucursales = data,
      (error) => console.error('Error fetching sucursales:', error)
    );
  }

  transformDate(date: Date | string): string {
    return this.datePipe.transform(date, 'mediumDate')!;
  }
  
  openEditModal(sucursal: sucursales): void {
    this.selectedSucursales = { ...sucursal };
    this.editForm.setValue({
      name: sucursal.name,
      address: sucursal.address,
      popularity: sucursal.popularity,
      branchId: sucursal.branchId,
      // Asegúrate de convertir la fecha en un formato adecuado si es necesario
      creationBranch: sucursal.creationBranch instanceof Date ? sucursal.creationBranch.toISOString().substring(0, 10) : sucursal.creationBranch
    });
  
    // Abre el modal y maneja la respuesta
    const dialogRef = this.dialog.open(this.editModal);
  
    // Suscríbete al resultado del cierre del modal
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateSucursal();  // Llama a updateSucursal solo si hay una confirmación para guardar
      }
    });
  }

  searchByName(): void {
    if (this.searchText) {
      this.sucursalesService.getBranchByName(this.searchText).subscribe(
        data => {
          this.sucursales = [data]; // Asegúrate que el servicio devuelve el formato adecuado
        },
        error => console.error('Error fetching branch by name:', error)
      );
    } else {
      this.loadSucursales();
    }
  }

  filterByPopularity(): void {
    if (this.selectedPopularity) {
      this.sucursalesService.getBranchByPopularity(this.selectedPopularity).subscribe(
        data => this.sucursales = data,
        error => console.error('Error fetching branches by popularity:', error)
      );
    } else {
      this.loadSucursales();
    }
  }
  close(): void {
    this.dialog.closeAll();
  }
  

  closeEditModal(): void {
    this.dialog.closeAll();
  }

  openCreateModal(): void {
    this.dialog.open(this.createModal);
  }

  closeCreateModal(): void {
    this.dialog.closeAll();
  }

  updateSucursal(): void {
    if (!this.editForm.valid) {
      console.error('Formulario no válido');
      return;
    }
  
    // Actualiza el modelo con los datos del formulario
    const formData = this.editForm.value;
    this.selectedSucursales = { ...this.selectedSucursales, ...formData };
  
    this.sucursalesService.updateSucursal(this.selectedSucursales).subscribe(
      () => {
        this.loadSucursales();
        this.closeEditModal();
      },
      (error) => {
        console.error('Error updating sucursal:', error);
      }
    );
  }
  

  deleteSucursal(id: number | null): void {
    if (id === null) {
      console.error('ID no válido');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmarEliminacionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sucursalesService.deleteSucursal(id).subscribe(
          () => {
            this.loadSucursales();
          },
          error => {
            console.error('Error al eliminar la sucursal:', error);
          }
        );
      }
    });
  }

  createSucursal(): void {
    const newSucursalData = this.createForm.value;
    newSucursalData.creationBranch = new Date(); // Asigna la fecha y hora actual
    this.sucursalesService.createSucursal(newSucursalData).subscribe(
      () => {
        this.loadSucursales();
        this.closeCreateModal();
      },
      (error) => {
        console.error('Error creating sucursal:', error);
      }
    );
  }
  
}
