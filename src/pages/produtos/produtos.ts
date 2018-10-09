import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProdutoDto} from "../../models/produtoDto";

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens: ProdutoDto[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   this.itens = [
     {
       id : "1",
       nome : "Mouse",
       preco : 80.98
     },
     {
       id : "2",
       nome : 'Teclado',
       preco : 100.00
     }
   ]
  };

}
