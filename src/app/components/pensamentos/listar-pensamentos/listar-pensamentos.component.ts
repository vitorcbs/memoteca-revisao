import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css'],
})
export class ListarPensamentosComponent {
  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  maisPensamentos: boolean = true;

  constructor(private service: PensamentoService) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos;
    });
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual).subscribe((listaPensamentos) => {
      this.listaPensamentos.push(...listaPensamentos);
      if (!listaPensamentos.length) {
        this.maisPensamentos = false;
      }
    });
  }
}
