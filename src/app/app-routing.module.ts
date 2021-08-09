import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarProductoComponent } from './components/listar-producto/listar-producto.component';

const routes: Routes = [
  {path: '', component: ListarProductoComponent},
  {path: 'create', component: CrearProductoComponent},
  {path: 'edit/:id', component: CrearProductoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}//wildcard que nos proporciona angular para redirigir en caso de error
  //con pathMatch: 'full', es la estrategia de matcheo, comparamos toda la url
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
