import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{

  constructor(private authSvc :AuthService,private router:Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

  return this.authSvc.user.pipe(take(1),map(user=>{
    if(user){
      return true;
    }else{
      this.router.createUrlTree(['/auth'])
      return false;
    };
  }));

  }

}
