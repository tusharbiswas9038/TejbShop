import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@tejb/orders';
import { LocalstorageService } from '@tejb/users';


@Component({
  selector: 'tejb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 press:boolean;
 isSign = "Sign In";
  constructor(private cartService:CartService, private localStorage:LocalstorageService, private router:Router) { }
  cartCount=0;
  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart)=>{
      this.cartCount= cart?.items.length ?? 0;
      this._signed();
    })
    
    this.press=true;
    document.getElementById("inPut").style.visibility = "hidden";
  }

_signed(){
 const token = this.localStorage.getToken();
 if(token){
   this.isSign = "Sign Out";
 }else{
   this.isSign = "Sign In";
 }
}

isLogin(){
  const token = this.localStorage.getToken();
  if(token){
    window.alert("You are signed out");
    this.localStorage.removeToken();
    window.location.reload();
  }else{
    this.router.navigateByUrl('/login');
  }

}
cons(){
  this.press=!this.press;
  
  
    if(this.press){
      document.getElementById("inPut").style.visibility = "hidden";
    }
    else{
      document.getElementById("inPut").style.visibility = "visible";
    }
  
  
}
}
