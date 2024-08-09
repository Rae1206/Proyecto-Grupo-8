import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { NgModule, ViewChild } from '@angular/core';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { BrowserModule } from '@angular/platform-browser';
import { sign } from 'crypto';
import { SigninComponent } from './componentes/signin/signin.component';
import { register } from 'module';
import { RegisterComponent } from './componentes/register/register.component';
import { GestionClientesComponent } from './gestion-clientes/gestion-clientes.component';
import { GestionGerentesComponent } from './gestion-gerentes/gestion-gerentes.component';
import { GestionCarritoComponent } from './componentes/gestionCarrito/gestionCarrito.component';
import { GestionCategoriasComponent } from './gestion-categorias/gestion-categorias.component';
import { GestionSucursalesComponent } from './gestion-sucursales/gestion-sucursales.component';
import { GestionPatrocinadoresComponent } from './gestion-patrocinadores/gestion-patrocinadores.component';
import { GestionEventosComponent } from './gestion-eventos/gestion-eventos.component';


export const routes: Routes = [
{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
{ path: 'productos', component: ProductosComponent },
{ path: 'inicio', component: InicioComponent },
{ path: 'carrito', component: CarritoComponent},
{ path: 'signin', component:SigninComponent},
{path:'register',component:RegisterComponent},
{path:'gestion-clientes',component:GestionClientesComponent},
{path:'gestion-gerentes',component:GestionGerentesComponent},
{path:'gestionCarrito',component:GestionCarritoComponent},
{path:'gestion-categoria',component:GestionCategoriasComponent},
{path:'gestion-sucursales',component:GestionSucursalesComponent},
{path:'gestion-patrocinadores',component:GestionPatrocinadoresComponent},
{path:'gestion-eventos',component:GestionEventosComponent}


];
@NgModule({
    imports: [RouterModule.forRoot(routes),BrowserModule],
    exports: [RouterModule]

  })
  
export class AppRoutingModule {
 
}
