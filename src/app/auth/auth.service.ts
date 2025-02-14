import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, Observable, Subject, throwError} from 'rxjs';
import {UserModel} from './user.model';
import {tap} from 'rxjs/operators';

export interface AuthResponseData {
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}


@Injectable({
  providedIn:'root'
})

export class AuthService{

  public webApiToken = 'AIzaSyBlS_fxPQn9uiI4zTOSWc0x8SExELKnm7Y'; //web api token is present in the project settings

  public user = new BehaviorSubject<UserModel>(null);

  constructor(private httpClient : HttpClient) {}

  public signUp(userData:{email:string,password:string}){

    return this.httpClient.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.webApiToken}`,
      {...userData,returnSecureToken:true}).pipe(catchError(this.handleError),tap(resData=>{
        this.authenticateUser(resData);
    }));

  }

  public onLogin(userData:{email:string,password:string}):Observable<AuthResponseData>{
    return this.httpClient.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.webApiToken}`,
      {...userData,returnSecureToken:true}).pipe(catchError(this.handleError),tap(resData=>{
        this.authenticateUser(resData);
    }));
  }

  public autoLogin(){

    let user = JSON.parse(localStorage.getItem('userData'));

    if(!user){
      return ;
    }

    const loadedUser = new UserModel(user.email,user.localId,user._token,new Date(user._tokenExpirationData));

    if(loadedUser.token){
      this.user.next(loadedUser);
    }

  }

  private authenticateUser(userData:AuthResponseData){
    let expirationDate = new Date(new Date().getTime() + +userData.expiresIn *1000);

    const user = new UserModel(userData.email,userData.localId,userData.idToken,expirationDate);

    this.user.next(user);

    localStorage.setItem('userData',JSON.stringify(user));

  }

  private handleError(errorRes:HttpErrorResponse){
    let errorMessage = 'An error occurred!';

    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already exists!'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid email entered.';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Invalid login credentials.';
        break;
    }

    return throwError(errorMessage);
  }

}
