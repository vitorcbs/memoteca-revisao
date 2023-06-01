import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { validacaoLetrasMinusculas } from './customValidators';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  formulario!: FormGroup;

  criarPensamento() {
    if (this.formulario.valid) {
      this.service.criarPensamentos(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamentos']);
      });
    }
  }

  cancelar() {
    this.router.navigate(['listarPensamentos']);
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ]),
      ],
      autoria: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
          Validators.minLength(3),
          validacaoLetrasMinusculas()
        ]),
      ],
      modelo: ['', Validators.compose([Validators.required])],
      favorito: [false]
    });
  }
}
