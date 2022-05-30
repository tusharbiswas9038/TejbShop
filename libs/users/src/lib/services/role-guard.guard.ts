import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(private router:Router, private localstoragetoken:LocalstorageService ){};
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.localstoragetoken.getToken();
      if(token){
        const tokenDecode = JSON.parse(atob(token.split('.')[1]));
         if(tokenDecode.isAdmin){
        return true;
        }
        window.alert('You are not authorised');
        this.localstoragetoken.removeToken();
        this.router.navigateByUrl('/login');
        window.location.reload();
        return false;
      
      

  }
  return false
  
}}
