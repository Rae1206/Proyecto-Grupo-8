import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosService } from '../servicios/productos.service';
import { CategoriaService } from '../servicios/categoria.service';
import { ProveedoresService } from '../servicios/proveedores.service';
import { categoria } from '../Interfaces/categoria';
import { proveedores } from '../Interfaces/proveedores';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ConfirmarEliminacionDialogComponent } from '../confirmar-eliminacion-dialog/confirmar-eliminacion-dialog.component';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, CommonModule, FormsModule],
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  productForm: FormGroup;
  categories: categoria[] = [];
  suppliers: proveedores[] = [];
  products: any[] = [];

  @ViewChild('createModal') createModal!: TemplateRef<any>;
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  createModalRef!: MatDialogRef<any>;
  editModalRef!: MatDialogRef<any>;
  currentEditingProductId: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductosService,
    private categoryService: CategoriaService,
    private supplierService: ProveedoresService,
    public sanitizer: DomSanitizer,  // Changed from private to public
    private dialog: MatDialog
  ) {
    this.productForm = this.fb.group({
      productImg: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      supplierId: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+\.\d{2}$/)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      isDisabled: [false]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadSuppliers();
    this.loadProducts();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categorías cargadas:', this.categories);
      },
      error: (err) => console.error('Error fetching categories:', err)
    });
  }

  loadSuppliers(): void {
    this.supplierService.getAllProveedores().subscribe({
      next: (data) => {
        this.suppliers = data;
        console.log('Proveedores cargados:', this.suppliers);
      },
      error: (err) => console.error('Error fetching suppliers:', err)
    });
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Productos cargados:', this.products);
      },
      error: (err) => console.error('Error fetching products:', err)
    });
  }

  openCreateModal(): void {
    this.createModalRef = this.dialog.open(this.createModal);
  }

  closeCreateModal(): void {
    this.createModalRef.close();
  }

  handleFileInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    if (element.files && element.files.length > 0) {
      const file = element.files[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        // Update the FormGroup
        this.productForm.patchValue({ productImg: fileReader.result });
      };
      fileReader.readAsDataURL(file); // Convert file to base64 string
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const product = this.productForm.value;
      const saveObservable = product.id 
        ? this.productService.updateProductById(product.id, product) 
        : this.productService.createProduct(product);
  
      saveObservable.subscribe({
        next: () => {
          this.resetForm();  // Resets the form
          this.closeCreateModal();  // Closes the modal after form reset
        },
        error: (error) => {
          console.error('Error saving product:', error);
          // Optionally handle errors, e.g., display an error message
        }
      });
    }
  }
  
  resetForm(): void {
    this.productForm.reset({
      isDisabled: false
    });
    this.loadProducts(); // Reload the list to show the new or updated product
  }
  disableProduct(productId: number): void {
    // Abre un diálogo de confirmación antes de proceder a deshabilitar
    const dialogRef = this.dialog.open(ConfirmarEliminacionDialogComponent, {
      data: {
        message: '¿Estás seguro de que deseas deshabilitar este producto?',
        buttonText: {
          ok: 'Deshabilitar',
          cancel: 'Cancelar'
        }
      }
    });
  
    // Maneja el cierre del diálogo
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Solo procede con la deshabilitación si el resultado es afirmativo
        this.productService.disableProductById(productId).subscribe({
          next: () => {
            console.log('Producto deshabilitado con éxito');
            this.loadProducts(); // Recarga la lista de productos para reflejar los cambios
          },
          error: (error) => {
            console.error('Error al deshabilitar el producto:', error);
          }
        });
      } else {
        console.log('Deshabilitación cancelada');
      }
    });
  }
  
  openEditModal(product: any): void {
    this.currentEditingProductId = product.id;  // Store the current product's ID
    console.log("el id del producto es:"+this.currentEditingProductId);
    this.productForm.setValue({
        productImg: product.productImg,
      name: product.name,
      description: product.description,
      categoryId: product.categoryId,
      supplierId: product.supplierId,
      price: product.price,
      stock: product.stock,
      isDisabled: product.isDisabled
    });
    this.dialog.open(this.editModal);
  }
  

  
  editProduct(): void {
    if (this.productForm.valid) {
      console.log('Product ID:', this.currentEditingProductId); // Check the ID being sent
      this.productService.updateProductById(this.currentEditingProductId, this.productForm.value).subscribe({
        next: () => {
          console.log('Producto actualizado con éxito');
          this.loadProducts();
          this.closeEditModal();
        },
        error: (err) => console.error('Error al actualizar producto:', err)
      });
    }
  }
  
  closeEditModal(): void {
    if (this.editModalRef) {
      this.editModalRef.close();
    }
  }
}
