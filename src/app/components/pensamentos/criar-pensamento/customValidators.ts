import { AbstractControl, ValidatorFn } from '@angular/forms';

export function validacaoLetrasMinusculas(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value = control.value  //obtem o valor do controle de formulario

    if (value && !/^[a-z]+$/.test(value)) {
      return { lowercaseOnly: true }
    }else{
      return null
    }
  }
}
