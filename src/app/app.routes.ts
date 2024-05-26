import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { NgModule } from '@angular/core';
import { InicioComponent } from './componentes/inicio/inicio.component';

export const routes: Routes = [
{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
{ path: 'productos', component: ProductosComponent },
{ path: 'inicio', component: InicioComponent },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
