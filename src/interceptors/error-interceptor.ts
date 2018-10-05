import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {StorageService} from "../services/storage.service";
import {AlertController} from "ionic-angular"; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


  constructor(public storage: StorageService,
              public alertControler: AlertController) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch((error, caught) => {

        let errorObj = error;
        if (errorObj.error) {
          errorObj = errorObj.error;
        }
        if (!errorObj.status) {
          errorObj = JSON.parse(errorObj);
        }

        console.log("Erro detectado pelo interceptor:");
        console.log(errorObj);

        switch (errorObj.status) {
          case 401:
            this.hundle401();
            break;
          case 403:
            this.hundle403();
            break;
          default:
            this.hundleDefaultError(errorObj);
        }

        return Observable.throw(errorObj);
      }) as any;
  }

  hundle403() {
    this.storage.setLocalUser(null);
  }

  private hundle401() {
    let alert = this.alertControler.create({
      title: 'Erro 401: Falha de autenticação',
      message: 'Email ou senha incorretos',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }

  private hundleDefaultError(errorObj) {
    let alert = this.alertControler.create({
      title: 'Erro ' +errorObj.status +': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
