import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {Observable} from "rxjs";
import {ProdutoDto} from "../../models/produtoDto";

@Injectable()
export class ProdutoService {


  constructor(public http : HttpClient) {
  }

  findById(produto_id : string){
    return this.http.get<ProdutoDto>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }

  findByCategoria(categoria_id : string){
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/page?categorias=${categoria_id}`);
  }

  getSmallImageFromBucket(id : string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }

  getImageFromBucket(id : string) : Observable<any>{
    let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }
}
