import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriarPensamentoComponent } from './components/pensamentos/criar-pensamento/criar-pensamento.component';
import { ListarPensamentosComponent } from './components/pensamentos/listar-pensamentos/listar-pensamentos.component';

const routes: Routes = [
  {
    path: 'criarPensamentos',
    component: CriarPensamentoComponent
  },
  {
    path: '',
    redirectTo: 'listarPensamentos',
    pathMatch: 'full'
  },
  {
    path: 'listarPensamentos',
    component: ListarPensamentosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
