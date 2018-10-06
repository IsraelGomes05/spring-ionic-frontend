import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      nome: ['Israel gomes', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['israel@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['46839449831', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua teste', [Validators.required]],
      numero: ['12', [Validators.required]],
      complemento: ['bairro', []],
      bairro: ['Coophema', []],
      cep: ['12121212', [Validators.required]],
      telefone1: ['89912812', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  signupUser() {
    console.log('aaa');
  }
}
