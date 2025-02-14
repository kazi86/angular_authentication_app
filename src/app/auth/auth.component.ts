import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls:['./auth.component.css']
})
export class AuthComponent{

  isLoginMode: boolean = true;

  isLoading: boolean = false;

  error: string;

  constructor(private authSvc : AuthService,private router:Router) {}

  onSwitchMode(){

    this.isLoginMode = !this.isLoginMode;

  }

  onSubmit(form: NgForm){

    this.isLoading = true;

    const userData = {email:form.value.email,password:form.value.password};

    let authObs : Observable<AuthResponseData> = new Observable<AuthResponseData>();

    if(this.isLoginMode){

      authObs = this.authSvc.onLogin(userData);

      form.reset();

    }
    else{

      authObs = this.authSvc.signUp(userData);

      form.reset();

    }

    authObs.subscribe({
      next:(result)=>{

        let data = result;

        this.router.navigate(['/recipes']);

      },
      error:(errResponse)=>{

        this.error = errResponse;

        this.isLoading = false;

      },
      complete:()=>{

        this.isLoading = false;

      }
    });

  }

}
