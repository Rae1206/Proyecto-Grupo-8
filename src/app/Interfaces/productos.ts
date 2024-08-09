export interface Category {
    categoryId: number;
    name: string;
    description: string;
    isDisabled: boolean;
  }
  
  export interface Supplier {
    supplierId: number;
    name?: string;  // Asumiendo que también puedas necesitar el nombre del proveedor
    isDisabled: boolean;
  }
  
  export interface Product {
    productImgUrl: string;
    name: string;
    description: string;
    categoryId: number;
    category: Category;
    supplierId: number;
    price: number;
    stock: number;
    isDisabled: boolean;
  }
  