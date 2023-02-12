import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor() { }

  set setAuth(auth: boolean) {
  localStorage.setItem("koruAuth",JSON.stringify({"koruAuth":auth}));
  }

  
  isAuthenticated() {
    let CheckAuth:any = JSON.parse(localStorage.getItem("koruAuth") || '{}')
    console.log("CheckAuth",CheckAuth.koruAuth);
    this.isLoggedIn = CheckAuth.koruAuth 
    console.log("CheckAutdddh",this.isLoggedIn);
    return this.isLoggedIn;
  }

}
