import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordToggle =true;
  loginInfo = this._formBuilder.group({
    UserName: ['', [Validators.required,Validators.minLength(3)]],
    Password: ['', [Validators.required,  this.passwordValidator]],

  })

  passwordValidator(control: FormControl) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    return !control.value.match(passwordPattern)
      ? { passwordInvalid: true }
      : null;
  }

  constructor( private _formBuilder: FormBuilder,private _auth:AuthService,private router: Router) { }

  ngOnInit(): void {
  }

   /* =======#GET METHODS======== */
   get userName() {
    return this.loginInfo.get('UserName');
  }
  get password() {
    return this.loginInfo.get('Password');
  }

  nextStep(event:any) {
    event?.stopPropagation()
    
    this.loginInfo.markAllAsTouched();

    if (this.loginInfo.valid) {

    console.log("valid");
    this._auth.setAuth = true
    this.router.navigate(['/']);
    }
  }

}
