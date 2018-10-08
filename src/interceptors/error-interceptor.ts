import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {StorageService} from "../services/storage.service";
import {FieldMessage} from "../models/fieldmessage";
import {AlertController} from "ionic-angular/components/alert/alert-controller";

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
          case 422:
            this.handle422(errorObj);
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

  private handle422(errorObj: any) {
    let alert = this.alertControler.create({
      title: 'Erro de Validação',
      message: this.listErrors(errorObj.errors),
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }

  private listErrors(messages : FieldMessage[]) : string {
    let s : string = '';
    for (var i=0; i<messages.length; i++) {
      s = s + '<p><strong>' + messages[i].fildName + "</strong>: " + messages[i].message + '</p>';
    }
    return s;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
