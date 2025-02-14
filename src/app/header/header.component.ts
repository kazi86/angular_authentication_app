import {Component, OnDestroy, OnInit} from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit,OnDestroy{

  subscription: Subscription;

  isAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService,private authSvc : AuthService,private router:Router) {}

  ngOnInit() {

    this.subscription = this.authSvc.user.subscribe({
      next:(user)=>{
        this.isAuthenticated = !user ? false : true;
      }
    })

  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authSvc.logout();
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();

  }

}
