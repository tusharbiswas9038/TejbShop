import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'tejb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted= false;
  authError= false;
  errorString = 'Internal Server Error';
  constructor(private formBuilder: FormBuilder, private auth:AuthService, private localStorageService : LocalstorageService, private router:Router) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm(){
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',Validators.required]
    });
  }
  
  onSubmit(){
    this.isSubmitted = true;
  if(this.loginForm['email'].invalid) return;
  
    this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe((user)=>{
      this.localStorageService.setToken(user.token ?? '')
      this.authError=false;
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      });;
     // window.location.assign(window.location.hostname + '/');
     
    },(error: HttpErrorResponse)=>{
      this.authError = true;
      if(error.status === 400){
      this.authError=true;
      this.errorString = error.error;
      }
      
    });
    
  }
  get loginForm(){
    return this.loginFormGroup.controls;
  }
}
