import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CidadeService} from "../../services/domain/cidade.service";
import {EstadoService} from "../../services/domain/estado.service";
import {EstadoDto} from "../../models/estado.dto";
import {CidadeDto} from "../../models/cidade.dto";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDto[];
  cidades: CidadeDto[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService) {

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

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidade();
      },
        error1 => {})
  }

  private updateCidade() {
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estadoId)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error1 => [] )
  }

  signupUser() {
    console.log('aaa');
  }
}
