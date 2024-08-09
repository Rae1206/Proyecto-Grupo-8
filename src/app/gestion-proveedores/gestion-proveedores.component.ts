import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ProveedoresService } from '../servicios/proveedores.service';
import { proveedores } from '../Interfaces/proveedores';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-proveedores',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './gestion-proveedores.component.html',
  styleUrl: './gestion-proveedores.component.css'
})
export class GestionProveedoresComponent {
  suppliers: proveedores[] = [];
  currentEditingProveedorId: number | undefined;  
  createForm: FormGroup;
  editForm: FormGroup;
  @ViewChild('createModal') createModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private proveedoresService: ProveedoresService,
    public dialog: MatDialog
  ) {
    this.createForm = this.fb.group({
      businessName: ['', Validators.required],
      tradeName: ['', Validators.required],
      companyName: ['', Validators.required],
      ruc: ['', Validators.required],
      companyPhone: ['', Validators.required],
      dateOfEntry: [new Date().toISOString().slice(0, 10), Validators.required], // Ensures date is set to today and is properly formatted

    });

    this.editForm = this.fb.group({
      businessName: ['', Validators.required],
      tradeName: ['', Validators.required],
      companyName: ['', Validators.required],
      ruc: ['', Validators.required],
      companyPhone: ['', Validators.required],
      dateOfEntry: [{value: ''}]  // Inicializado, pero deshabilitado y oculto

    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.proveedoresService.getAllProveedores().subscribe(data => {
      this.suppliers = data;
    }, error => {
    });
  }

  openCreateModal(): void {
    this.dialog.open(this.createModal);
  }

  closeCreateModal(): void {
    this.dialog.closeAll();
  }
  closeEditModal(): void {
    this.dialog.closeAll();
  }
  createProveedor(): void {
    if (this.createForm.valid) {
      this.proveedoresService.createProveedor(this.createForm.value).subscribe(() => {
        this.loadSuppliers();
        this.closeCreateModal();
      }, error => {
        console.error('Error creating supplier', error);
      });
    }
  }
  openEditModal(supplier: proveedores): void {
    this.currentEditingProveedorId = supplier.id;  // Asigna el ID del proveedor al abrir el modal
    const validDate = new Date(supplier.dateOfEntry);
    if (!isNaN(validDate.getTime())) {
        this.editForm.setValue({
            businessName: supplier.businessName,
            tradeName: supplier.tradeName,
            companyName: supplier.companyName,
            ruc: supplier.ruc,
            companyPhone: supplier.companyPhone,
            dateOfEntry: validDate.toISOString().substring(0, 10)
        });
    } else {
        console.error('Fecha de entrada no es válida:', supplier.dateOfEntry);
    }
    this.dialog.open(this.editModal);
}

  
  updateProveedor(): void {
    if (this.editForm.valid) {
      const updatedProveedor = {
        ...this.editForm.value,
        id: this.currentEditingProveedorId // Make sure `currentEditingProveedorId` is correctly set when opening the edit modal
      };
  
      this.proveedoresService.updateProveedor(updatedProveedor.id, updatedProveedor).subscribe({
        next: () => {
          this.loadSuppliers();
          this.closeEditModal();
        },
        error: (error) => {
          console.error('Error updating supplier:', error);
        }
      });
    }
  }
  

  disableProveedor(id: number): void {
    this.proveedoresService.disableProveedor(id).subscribe(() => {
      this.loadSuppliers();
    }, error => {
      console.error('Error disabling supplier', error);
    });
  }
}
