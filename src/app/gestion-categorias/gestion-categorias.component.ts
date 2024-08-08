import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { categoria } from '../Interfaces/categoria';
import { CategoriaService } from '../servicios/categoria.service';
import { ConfirmarEliminacionDialogComponent } from '../confirmar-eliminacion-dialog/confirmar-eliminacion-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-categorias',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './gestion-categorias.component.html',
  styleUrl: './gestion-categorias.component.css'
})
export class GestionCategoriasComponent {
  categorias: categoria[] = [];
  selectedCategoria: categoria = {
    categoryId: null,
    name: '',
    description: '',
    isDisable: false
  };

  newCategoria: categoria = {
    categoryId: null,
    name: '',
    description:'',
    isDisable: false
  };

  searchText: string = "";

  @ViewChild('editModal') editModal!: TemplateRef<any>;
  @ViewChild('createModal') createModal!: TemplateRef<any>;

  constructor( public categoriaService : CategoriaService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCategoria();
  }

  loadCategoria(): void {
    this.categoriaService.getAllCategories().subscribe(
      (data: categoria[]) => {
        this.categorias = data.map(categoria => ({
          ...categoria
        }));
        console.log('categorias:', this.categorias);
      },
      (error) => {
        console.error('Error fetching gerentes:', error);
      }
    );
  }


  openEditModal(categoria: categoria): void {
    this.selectedCategoria = { ...categoria };
    this.dialog.open(this.editModal);
  }

  closeEditModal(): void {
    this.dialog.closeAll();
  }

  openCreateModal(): void {
    this.newCategoria = {
      categoryId: null,
      name: '',
      description: '',
      isDisable: false
    };
    this.dialog.open(this.createModal);
  }

  closeCreateModal(): void {
    this.dialog.closeAll();
  }

  updateCategoria(): void {
    if (this.selectedCategoria.categoryId === null) {
      console.error('ID no válido');
      return;
    }

    this.categoriaService.updateCategory(this.selectedCategoria.categoryId, this.selectedCategoria).subscribe(
      () => {
        this.loadCategoria(); // Recargar la lista de gerentes
        this.closeEditModal();
      },
      (error) => {
        console.error('Error updating gerente:', error);
      }
    );
  }

  deleteCategoria(id: number | null): void {
    if (id === null) {
      console.error('ID no válido');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmarEliminacionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriaService.deleteCategory(id).subscribe(
          () => {
            console.log('categoria eliminado correctamente');
            this.loadCategoria(); // Recargar la lista de gerentes
          },
          error => {
            console.error('Error al eliminar la categoria:', error);
          }
        );
      } else {
        console.log('Eliminación cancelada');
      }
    });
  }

  createCategoria(): void {
    this.categoriaService.createCategory(this.newCategoria).subscribe(
      () => {
        this.loadCategoria(); // Recargar la lista de gerentes
        this.closeCreateModal();
      },
      (error) => {
        console.error('Error creating gerente:', error);
      }
    );
  }
  searchCategories(): void {
    // Verificar si el campo de búsqueda está vacío
    if (!this.searchText.trim()) {
      this.loadCategoria(); // Método para cargar todas las categorías
      return;
    }
  
    // Búsqueda por nombre
    this.categoriaService.getCategoriesByName(this.searchText).subscribe(
      (categoriasByName) => {
        if (categoriasByName.length > 0) {
          // Si hay resultados por nombre, asignar y evitar duplicados
          this.categorias = categoriasByName;
        } else {
          // Si no hay resultados por nombre, buscar por descripción
          this.categoriaService.getCategoriesByDescription(this.searchText).subscribe(
            (categoriasByDescription) => {
              this.categorias = categoriasByDescription;
            },
            (error) => {
              console.error('Error fetching categories by description:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching categories by name:', error);
      }
    );
  }
  
}
