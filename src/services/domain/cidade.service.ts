import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {Observable} from "rxjs/Rx";
import {CidadeDto} from "../../models/cidade.dto";

@Injectable()
export class CidadeService {

  constructor(public http: HttpClient) {

  }

  findAll(estadoId : string) : Observable<CidadeDto[]>{
    return this.http.get<CidadeDto[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
  }
}
