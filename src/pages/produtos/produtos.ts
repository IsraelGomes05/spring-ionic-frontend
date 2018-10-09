import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProdutoDto} from "../../models/produtoDto";
import {ProdutoService} from "../../services/domain/produto.service";

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  itens: ProdutoDto[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoriaId)
      .subscribe(response => {
        this.itens = response['content'];
      },
        error1 => {});
  };

}
