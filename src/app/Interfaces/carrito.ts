import { producto} from './producto';

export interface Carrito {
  id: number;
  usuarioId: number;
  productos: producto[];
  estado: 'enviado' | 'pendiente';
}