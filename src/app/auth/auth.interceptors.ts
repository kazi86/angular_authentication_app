import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
import {exhaustMap, take, takeUntil} from 'rxjs/operators';

@Injectable()
export class AuthInterceptors implements HttpInterceptor{

  constructor(private authSvc :AuthService) {}

  intercept(request:HttpRequest<any>,next:HttpHandler){

    return this.authSvc.user.pipe(take(1),exhaustMap(user=>{
     if(user)  {
      let  modifiedReq =  request.clone({params:new HttpParams().set('auth',user.token)});
      next.handle(modifiedReq);
    }
    else{
      return next.handle(request);
    }
    }));

  }

}
