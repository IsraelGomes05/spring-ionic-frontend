import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CartItem} from "../../models/cart-item";
import {API_CONFIG} from "../../config/api.config";
import {ProdutoService} from "../../services/domain/produto.service";
import {CartService} from "../../services/domain/cart.service";
import {ProdutoDto} from "../../models/produtoDto";

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  private items: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService : ProdutoService,
    public cartService : CartService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.itens;
    this.loadImageUrls();
  }

  loadImageUrls(){
    for (var i = 0; i < this.items.length; i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {
            item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
          },
          error1 => {});
    }
  }

  removeItem(produto : ProdutoDto){
    this.items = this.cartService.remove(produto).itens;
  }

  increaseQuantity(produto : ProdutoDto){
    this.items = this.cartService.increaseQuantity(produto).itens;
  }

  decreaseQuantity(produto : ProdutoDto){
    this.items = this.cartService.decreaseQuantity(produto).itens;
  }

  total() : number {
    return this.cartService.total();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage');
  }
}
