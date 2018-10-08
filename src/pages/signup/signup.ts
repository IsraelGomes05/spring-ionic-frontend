import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CidadeService} from "../../services/domain/cidade.service";
import {EstadoService} from "../../services/domain/estado.service";
import {EstadoDto} from "../../models/estado.dto";
import {CidadeDto} from "../../models/cidade.dto";
import {ClienteService} from "../../services/domain/cliente.service";
import {AlertController} from "ionic-angular";

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
    public estadoService: EstadoService,
    public clienteService : ClienteService,
    public alert: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['Israel gomes', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['israel@gmail.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['46839490831', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
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

  updateCidade() {
    let estado_Id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_Id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error1 => [] )
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error1 => {})
  }

  showInsertOk() {
    let alert = this.alert.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.goToRoot(null);
          }
        }
      ]
    });
    alert.present();
  }
}
