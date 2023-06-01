import { Component } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validacaoLetrasMinusculas } from '../criar-pensamento/customValidators';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent {
  formulario!: FormGroup;

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  };

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private FormBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento; //o pensamento instanciado no começo da classe recebe o valor achado pelo id

      this.formulario = this.FormBuilder.group({
        conteudo: [
          `${this.pensamento.conteudo}`,
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
        autoria: [
          `${this.pensamento.autoria}`,
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
            Validators.minLength(3),
            validacaoLetrasMinusculas(),
          ]),
        ],
        modelo: [
          `${this.pensamento.modelo}`,
          Validators.compose([Validators.required]),
        ],
        favorito: [],
      });
    });
  }

  editarPensamento() {
    if (this.formulario.valid) {
      this.pensamento = { ...this.formulario.value, id: this.pensamento.id }; //quebra os itens do formulario e adiciona o id que não vem com o form
      this.service.editarPensamento(this.pensamento).subscribe(() => {
        this.router.navigate(['/listarPensamentos']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['/listarPensamentos']);
  }
}
