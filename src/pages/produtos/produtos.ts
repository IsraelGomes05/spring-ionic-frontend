import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProdutoDto} from "../../models/produtoDto";
import {ProdutoService} from "../../services/domain/produto.service";
import {API_CONFIG} from "../../config/api.config";

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
          this.loadImageUrls();
      },
        error1 => {});
  };

  loadImageUrls(){
    for (var i = 0; i < this.itens.length; i++){
      let item = this.itens[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
          error1 => {});
    }
  }

  showDetail(){
    this.navCtrl.push('ProdutoDetailPage');
  }
}
