import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {Observable} from "rxjs/Rx";
import {EstadoDto} from "../../models/estado.dto";

@Injectable()
export class EstadoService {

  constructor(public http: HttpClient) {

  }

  findAll() : Observable<EstadoDto[]>{
    return this.http.get<EstadoDto[]>(`${API_CONFIG.baseUrl}/estados`);
  }
}
