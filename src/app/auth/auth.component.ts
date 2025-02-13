import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  isLoginMode = true;


  constructor(private authSvc : AuthService) {}


  onSwitchMode(){

    this.isLoginMode = !this.isLoginMode;

  }

  onSubmit(form: NgForm){

    if(this.isLoginMode){}
    else{

      const userData = {email:form.value.email,password:form.value.password}

      this.authSvc.signUp(userData).subscribe({
        next:(result)=>{

          let data = result;

        },
        error:(err)=>{

          console.error('Unable to Sign Up User,',err);

        },
        complete:()=>{}
      });

      form.reset();


    }

  }


}
