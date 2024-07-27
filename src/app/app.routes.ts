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


export const routes: Routes = [
{ path: '', redirectTo: '/inicio', pathMatch: 'full' },
{ path: 'productos', component: ProductosComponent },
{ path: 'inicio', component: InicioComponent },
{ path: 'carrito', component: CarritoComponent},
{ path: 'signin', component:SigninComponent},
{path:'register',component:RegisterComponent},
{path:'gestion-clientes',component:GestionClientesComponent}

];
@NgModule({
    imports: [RouterModule.forRoot(routes),BrowserModule],
    exports: [RouterModule]

  })
  
export class AppRoutingModule {
 
}
