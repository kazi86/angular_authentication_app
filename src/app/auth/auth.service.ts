import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';

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

  constructor(private httpClient : HttpClient) {}

  public signUp(userData:{email:string,password:string}){

    return this.httpClient.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.webApiToken}`,
      {...userData,returnSecureToken:true}).pipe(catchError(this.handleError));

  }

  public onLogin(userData:{email:string,password:string}):Observable<AuthResponseData>{
    return this.httpClient.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.webApiToken}`,
      {...userData,returnSecureToken:true}).pipe(catchError(this.handleError));
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
