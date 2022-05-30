import { Component, OnInit } from '@angular/core';
import { UsersService } from '@tejb/users';

@Component({
  selector: 'tejb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private usersService:UsersService){}
  title = 'e-commerce';

  ngOnInit(): void {
      this.usersService.initAppSession();
  }
}
