import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
interface AuthResponseData {
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
}


@Injectable({
  providedIn:'root'
})

export class AuthService{

  public webApiToken = 'AIzaSyBlS_fxPQn9uiI4zTOSWc0x8SExELKnm7Y'; //web api token is present in the project settings

  constructor(private httpClient : HttpClient) {}

  public signUp(userData:{email:string,password:string}){

    return this.httpClient.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.webApiToken}`,{...userData,returnSecureToken:true});

  }


}
