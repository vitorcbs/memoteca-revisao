import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from '../../../custom-reuse-strategy';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css'],
})
export class ListarPensamentosComponent {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  maisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural'

  constructor(private service: PensamentoService, private Router: Router) {}

  ngOnInit(): void {
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  pesquisarPensamentos() {
    this.maisPensamentos = true;
    this.paginaAtual = 1;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  carregarMaisPensamentos() {
    this.service
      .listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos.push(...listaPensamentos);
        if (!listaPensamentos.length) {
          this.maisPensamentos = false;
        }
      });
  }

  listarFavoritos() {
    this.titulo = 'Meus favoritos'
    this.maisPensamentos = true;
    this.paginaAtual = 1;
    this.service
      .listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((listaPensamentosFavoritos) => {
        this.listaPensamentos = listaPensamentosFavoritos;
        this.listaFavoritos = listaPensamentosFavoritos;
      });
  }

  recarregarPagina() {
    this.favoritos = false;
    this.paginaAtual = 1;

    this.Router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.Router.onSameUrlNavigation = 'reload';
    this.Router.navigate([this.Router.url]);
  }
}
